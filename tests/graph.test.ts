import test from "node:test";
import assert from "node:assert/strict";
import { CapabilityGraph, runDeterministicGate } from "../src/graph/executor.js";
import { ContractError, type NodeDefinition } from "../src/graph/contracts.js";

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const gate = { verify: async (_id: string, result: { verified: boolean }) => ({ passed: result.verified, reasons: ["not verified"] }) };

test("validates dependencies and executes nodes in dependency order", async () => {
  const order: string[] = [];
  const source: NodeDefinition<Record<string, unknown>, { value: number }> = {
    id: "source", dependsOn: [], inputContract: isRecord,
    outputContract: (v): v is { value: number } => isRecord(v) && typeof v.value === "number",
    execute: async () => { order.push("source"); return { output: { value: 7 }, evidence: [], verified: true }; }
  };
  const sink: NodeDefinition<Record<string, unknown>, string> = {
    id: "sink", dependsOn: ["source"], inputContract: isRecord,
    outputContract: (v): v is string => typeof v === "string",
    execute: async (_input, _ctx, deps) => {
      order.push("sink");
      return { output: String((deps.get("source")?.output as { value: number }).value), evidence: [], verified: true };
    }
  };
  const graph = new CapabilityGraph(gate).add(sink).add(source);
  const result = await graph.run({ request: "test" }, "test-run");
  assert.deepEqual(order, ["source", "sink"]);
  assert.equal(result.results.get("sink")?.output, "7");
  assert.ok(result.events.some(e => e.phase === "succeeded" && e.nodeId === "$graph"));
});

test("rejects dependency cycles before execution", () => {
  const node = (id: string, dep: string): NodeDefinition => ({
    id, dependsOn: [dep], inputContract: isRecord, outputContract: () => true,
    execute: async () => ({ output: null, evidence: [], verified: true })
  });
  const graph = new CapabilityGraph(gate).add(node("a", "b")).add(node("b", "a"));
  assert.throws(() => graph.validate(), ContractError);
});

test("blocks external actions without approval or required evidence", async () => {
  let invoked = false;
  const result = { output: "send", verified: true, evidence: [] };
  await assert.rejects(() => runDeterministicGate(result, { approved: false, expectedEvidenceKind: "test" }, async () => { invoked = true; }));
  assert.equal(invoked, false);
});
