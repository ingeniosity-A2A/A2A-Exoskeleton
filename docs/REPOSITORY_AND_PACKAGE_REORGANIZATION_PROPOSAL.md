# Repository and Package Reorganization Proposal

**Status: PROPOSAL ONLY — no file, directory, package, or crate renames approved yet.**

This document records the current repository findings and the proposed naming/workspace changes. Each mapping below requires explicit owner approval before execution. No file is renamed by this document.

## Design rules

1. Keep repository ownership boundaries intact. Cybernetic-Ava007 owns intellect; A2A-Exoskeleton owns the non-cognitive execution substrate; Omni-OS owns device/environment capabilities.
2. pnpm manages JavaScript/TypeScript dependencies only. Cargo manages Rust dependencies. Python packaging, OS packages, native toolchains, and container images require separate dependency evidence.
3. Use one root lockfile per package-manager workspace. Do not force unrelated repositories or ecosystems into one lockfile.
4. Reuse pnpm's content-addressable store per trusted host; use workspace deduplication within a workspace. A local pnpm store is not a cross-host shared directory.
5. Preserve source imports, model assets, historical snapshots, and generated artifacts unless their ownership and provenance have been established.
6. No GitHub Actions. Validation must be runnable locally or on an explicitly approved operator host.
7. Names are architectural interfaces. A rename requires a path map, reverse-reference inventory, migration plan, tests, and rollback.

## Audit findings

### Cybernetic-Ava007

- Root pnpm workspace is pinned to pnpm 12.14.0 and declares `intelligence/ui` and `curation/ai-sdk`.
- The root has `pnpm-lock.yaml`, but the active UI directory also contains `package-lock.json`, and the AI SDK directory contains `bun.lock`. This creates competing package-manager authority unless these are explicitly archival and unused.
- `imports/ava007-source/intellect/Cybernetic-Ava007-intellect-gateway/` contains its own package manifest and npm lockfile. It appears to be imported source and should not be swept into the active workspace without provenance and ownership review.
- `intelligence/skills/taskello-forged-card/scaffold/package.json` is a scaffold/template candidate, not automatically a live workspace package.
- `protocols/cognitive-interface/Cargo.toml` is a separate Rust package; pnpm must not be used to manage its Rust dependencies.
- An existing `.github/workflows/pnpm-certify.yml` contradicts the no-GitHub-Actions requirement and pins pnpm 12.10.0, out of step with the root manifest.

### A2A-Exoskeleton

- Python packaging is rooted at `pyproject.toml`.
- Rust currently has a package manifest at `rust/Cargo.toml`; a separate crate exists at `crates/degradation-policy/Cargo.toml`.
- No root Cargo workspace manifest or Cargo.lock was found in the tracked tree. The two Rust packages therefore do not yet have a clearly declared shared Cargo workspace/lockfile authority.
- `void/GSAP_KERNEL_INDEX.md` and `wiki/architecture/gsap-orchestration.md` use GSAP/TEK and timeline language that may refer to animation/timing concepts. The intended architecture defines GSAP as **GPU-Accelerated Stochastic Graph Partitioner**, with orchestration as a first-class responsibility. The acronym collision must be resolved explicitly before renaming or moving these docs.
- No TurboVec implementation or manifest was found in either audited GitHub repository tree. TurboVec should remain at its verified source until the intended integration boundary is identified; do not duplicate or relocate it based on a guessed path.

## Rename and naming approval matrix

All proposed mappings are **PENDING**. Approve or reject each item by its ID; no proposed rename is executed until approval.

| ID | Current path / identifier | Proposed path / identifier | Reason and constraints |
|---|---|---|---|
| A1 | `intelligence/ui` | `apps/ui-editor` | Mark as an application rather than a general intelligence library. Requires updating workspace path, scripts, docs, imports, and tooling. Alternative: retain current path to preserve semantic ownership. |
| A2 | `curation/ai-sdk` | `packages/curation-ai-sdk` | Make the reusable integration package explicit and align it with a conventional workspace package area. Requires updating workspace path, root filters, docs, and callers. |
| A3 | `ava007-ui-editor` | `@ingeniosity/ava007-ui-editor` | Optional scoped package name for clearer identity; private package, so scope is organizational rather than publication permission. |
| A4 | `ava007-ai-sdk` | `@ingeniosity/curation-ai-sdk` | Optional scoped package name aligned to its curation responsibility. Update all pnpm filters and callers. |
| E1 | `rust/Cargo.toml` as standalone package root | Keep as package manifest; add a repository-root `Cargo.toml` workspace manifest | Establish one Cargo workspace and lockfile for `rust` and `crates/degradation-policy` without moving Rust source directories. This is a new manifest, not a rename. |
| E2 | Cargo package `ava007-agent-exoskeleton` | `exoskeleton-runtime` | Align crate identity with the repository's non-cognitive runtime role. Package renaming can break commands, references, and downstream dependencies; requires approval. |
| E3 | Cargo package `degradation-policy` | `exoskeleton-degradation-policy` | Make crate ownership unambiguous if it is part of the shared Exoskeleton workspace. Requires approval and reference updates. |
| G1 | `void/GSAP_KERNEL_INDEX.md` | `void/GSAP_GRAPH_PARTITIONER_INDEX.md` | Only if the document is confirmed to index the GPU-Accelerated Stochastic Graph Partitioner rather than GreenSock animation timelines or the separate TEK concept. |
| G2 | `wiki/architecture/gsap-orchestration.md` | `wiki/architecture/gsap-graph-partitioner-orchestration.md` | Only after content is revised to describe graph partitioning, scheduling, dependency coordination, synchronization, lifecycle, interruption, and rollback—not animation analogies alone. |
| G3 | GSAP = mixed timeline/animation terminology | GSAP = **GPU-Accelerated Stochastic Graph Partitioner**; TEK = separate temporal execution concept, if retained | Canonical terminology proposal. Must not erase useful GreenSock/UI source material; separate those references into clearly named adapters/docs if applicable. |

## Dependency-file disposition proposal

These are not renames; they are proposed authority decisions requiring confirmation during implementation:

- Active pnpm workspace packages should be installed and locked by the root `pnpm-lock.yaml`. The UI `package-lock.json` and curation `bun.lock` should be retired only after migration, a clean frozen install, and package-specific checks pass.
- Keep imported-source lockfiles under `imports/` as provenance artifacts unless the imported project is deliberately activated as a maintained package.
- Keep scaffold/template manifests outside the live workspace until they are real, reviewed workspace packages.
- Create a root Cargo workspace only after validating crate dependencies and source paths; generate `Cargo.lock` from Cargo and test it independently of pnpm.
- Python dependencies need a separate lock/constraints and hash/provenance plan. The current lower-bound ranges in `pyproject.toml` do not establish a reproducible environment.
- TurboVec's Cargo crate and local smoke-test harness need a documented source-of-truth, version, API contract, and benchmark/test boundary before Exoskeleton integrates it.
- GSAP dependency inventory must distinguish any actual GreenSock package used by UI code from the graph-partitioner subsystem. Do not install a JavaScript animation library as a substitute for the graph-partitioning engine.

## Execution gates after approval

1. Record approved IDs and rejected IDs in this file.
2. Produce a reverse-reference inventory for every approved mapping.
3. Apply path/name changes in small, directly committed changes on `main`; preserve history where possible.
4. Update workspace and lockfile authority without mixing package managers.
5. Run clean frozen pnpm install, pnpm certification, relevant UI build/typecheck/smoke tests, Cargo metadata/check/tests, Python validation, and GSAP/TurboVec contract tests where implemented.
6. Record PASS, FAIL, BLOCKED, or NOT RUN for every check. Never label an unexecuted check as passed.
7. Retain rollback commit IDs and the old-to-new path map.

## Approval format

Reply with approved IDs, for example: `A1, A2, E1, E2, G1`. Reject or request alternatives by ID. Approval of one ID does not approve other names or moves.
