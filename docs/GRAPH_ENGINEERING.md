# Exoskeleton Graph Engineering

## Responsibility boundary
Exoskeleton owns capability contracts, dependency routing, lifecycle events, and verification gates. It does not own model weights, embedding inference runtimes, Android/device stacks, or browser engines. Those remain capabilities provided by Omni-OS or a separately governed worker.

## TurboVec semantic-search pipeline
1. embedding generation: text input -> vector plus model/runtime metadata.
2. vector indexing: vector/document records -> index receipt and index version.
3. semantic search: query vector -> aligned indices and scores. Scores must come from TurboVec's scores_for_query(0) and align positionally with indices_for_query(0). Never synthesize relevance scores.
4. search verification: assert score/index cardinality, finite numeric scores, valid index references, and deterministic fixture expectations.
5. response serialization: preserve the existing frontend response shape; expose only verified search output.
6. event logging: persist node timing, model identity, index version, failures, and verification evidence.

Embedding inference is a capability contract, not a hard-coded runtime. Implement a provider adapter only after verifying the actual Termux architecture, installed binaries/libraries, and available model files. Hugging Face model availability does not imply compatibility with a particular llama.cpp build or Android ABI.

## Operational gates
- No external action may be triggered by unverified output.
- Model-generated content is data, not executable policy.
- Keep model files out of Git; use the designated runtime/model store.
- Measure embedding, indexing, query, verification, and serialization separately.
- Feed reusable Skills only from verified outputs and evidence.

## Validation
Run pnpm install, then pnpm check. This branch has not been executed on the user's Termux device.
