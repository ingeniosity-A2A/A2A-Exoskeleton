import { ContractError, VerificationError, type EventSink, type GraphContext, type GraphEvent, type NodeDefinition, type NodeId, type NodeResult, type VerificationGate } from "./contracts.js";

export interface GraphRunResult {
  readonly runId: string;
  readonly results: ReadonlyMap<NodeId, NodeResult>;
  readonly events: readonly GraphEvent[];
}

export class CapabilityGraph {
  private readonly nodes = new Map<NodeId, NodeDefinition>();
  constructor(private readonly gate: VerificationGate, private readonly emit: EventSink = () => undefined) {}

  add(node: NodeDefinition): this {
    if (!node.id.trim()) throw new ContractError("Node id cannot be empty");
    if (this.nodes.has(node.id)) throw new ContractError("Duplicate node: " + node.id);
    this.nodes.set(node.id, node);
    return this;
  }

  validate(): readonly NodeId[] {
    for (const node of this.nodes.values()) {
      for (const dependency of node.dependsOn) {
        if (!this.nodes.has(dependency)) throw new ContractError("Node " + node.id + " depends on missing node " + dependency);
      }
    }
    const ordered: NodeId[] = [];
    const visiting = new Set<NodeId>();
    const visited = new Set<NodeId>();
    const visit = (id: NodeId): void => {
      if (visiting.has(id)) throw new ContractError("Dependency cycle detected at " + id);
      if (visited.has(id)) return;
      visiting.add(id);
      for (const dependency of this.nodes.get(id)!.dependsOn) visit(dependency);
      visiting.delete(id); visited.add(id); ordered.push(id);
    };
    for (const id of this.nodes.keys()) visit(id);
    return ordered;
  }

  async run(input: Readonly<Record<string, unknown>>, runId = crypto.randomUUID()): Promise<GraphRunResult> {
    const order = this.validate();
    const context: GraphContext = { runId, startedAt: new Date().toISOString(), inputs: input };
    const results = new Map<NodeId, NodeResult>();
    const events: GraphEvent[] = [];
    const record = async (event: GraphEvent): Promise<void> => { events.push(event); await this.emit(event); };
    await record({runId,nodeId:"$graph",phase:"started",timestamp:new Date().toISOString()});
    try {
      for (const id of order) {
        const node = this.nodes.get(id)!;
        const deps = new Map<NodeId, NodeResult>();
        for (const dep of node.dependsOn) {
          const result = results.get(dep);
          if (!result?.verified) {
            await record({runId,nodeId:id,phase:"blocked",timestamp:new Date().toISOString(),detail:"Dependency " + dep + " is not verified"});
            throw new VerificationError(id, ["Dependency " + dep + " is not verified"]);
          }
          deps.set(dep,result);
        }
        const nodeInput: unknown = node.dependsOn.length === 0 ? input : Object.fromEntries(deps);
        if (!node.inputContract(nodeInput)) throw new ContractError("Input contract rejected payload for node " + id);
        await record({runId,nodeId:id,phase:"started",timestamp:new Date().toISOString()});
        try {
          const result = await node.execute(nodeInput,context,deps);
          if (!node.outputContract(result.output)) throw new ContractError("Output contract rejected result for node " + id);
          if (!result.verified) throw new VerificationError(id, ["Node marked result unverified"]);
          const verdict = await this.gate.verify(id,result);
          if (!verdict.passed) throw new VerificationError(id,verdict.reasons);
          results.set(id,result);
          await record({runId,nodeId:id,phase:"succeeded",timestamp:new Date().toISOString()});
        } catch (error) {
          await record({runId,nodeId:id,phase:"failed",timestamp:new Date().toISOString(),detail:error instanceof Error ? error.message : String(error)});
          throw error;
        }
      }
      await record({runId,nodeId:"$graph",phase:"succeeded",timestamp:new Date().toISOString()});
      return {runId,results,events};
    } catch (error) {
      await record({runId,nodeId:"$graph",phase:"failed",timestamp:new Date().toISOString(),detail:error instanceof Error ? error.message : String(error)});
      throw error;
    }
  }
}

/** External actions require explicit policy approval, evidence, and a verified result. */
export async function runDeterministicGate<T>(
  result: NodeResult<T>,
  policy: { readonly approved: boolean; readonly expectedEvidenceKind: string },
  action: (output: T) => Promise<void>
): Promise<void> {
  if (!policy.approved) throw new Error("External action blocked: policy approval is absent");
  if (!result.verified) throw new Error("External action blocked: result is not verified");
  if (!result.evidence.some(item => item.kind === policy.expectedEvidenceKind)) {
    throw new Error("External action blocked: required evidence " + policy.expectedEvidenceKind + " is absent");
  }
  await action(result.output);
}
