export type NodeId = string;
export type RunId = string;

export interface Evidence {
  readonly kind: "test" | "measurement" | "artifact" | "policy";
  readonly name: string;
  readonly value: string | number | boolean;
  readonly timestamp: string;
}
export interface GraphContext {
  readonly runId: RunId;
  readonly startedAt: string;
  readonly inputs: Readonly<Record<string, unknown>>;
}
export interface NodeResult<T = unknown> {
  readonly output: T;
  readonly evidence: readonly Evidence[];
  readonly verified: boolean;
}
export interface NodeDefinition<I = unknown, O = unknown> {
  readonly id: NodeId;
  readonly dependsOn: readonly NodeId[];
  readonly inputContract: (value: unknown) => value is I;
  readonly outputContract: (value: unknown) => value is O;
  readonly execute: (input: I, context: GraphContext, dependencies: ReadonlyMap<NodeId, NodeResult>) => Promise<NodeResult<O>>;
}
export interface GraphEvent {
  readonly runId: RunId;
  readonly nodeId: NodeId | "$graph";
  readonly phase: "started" | "succeeded" | "failed" | "blocked";
  readonly timestamp: string;
  readonly detail?: string;
}
export type EventSink = (event: GraphEvent) => void | Promise<void>;
export interface VerificationGate {
  verify(nodeId: NodeId, result: NodeResult): Promise<{ readonly passed: boolean; readonly reasons: readonly string[] }>;
}
export class ContractError extends Error {
  constructor(message: string) { super(message); this.name = "ContractError"; }
}
export class VerificationError extends Error {
  constructor(readonly nodeId: NodeId, readonly reasons: readonly string[]) {
    super("Verification failed for " + nodeId + ": " + reasons.join("; "));
    this.name = "VerificationError";
  }
}
