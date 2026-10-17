# a2a-exoskeleton

**O(1) Context Orchestration Substrate** — GSAP kernel, capability contracts, execution lifecycle.

Not intellect. Not the operating/capability environment. Not primary memory authority.

## Official hierarchy

```text
CYBERNETIC-AVA007                         ← INTELLECT
  reason · infer · learn · decide · adapt
        │ Intent
        ▼
a2a-exoskeleton          ← THIS REPO      ← EXOSKELETON / ORGANISM
  GSAP Kernel · capability contracts
  discover → select → allocate → execute
  → observe → interrupt → reverse → release
        │ capability.request
        ▼
Ava007-Omni-OS                            ← OMNI-OS (environments)
  edge · network · devices · browser
  compute (CUDA/GPU workers) · containers
        │
   ┌────┼────┬──────────┐
   ▼    ▼    ▼          ▼
  S26  RevPi Oracle   Agent-X
Termux Linux  GPU     skill execution

Forged-Filing-Sys                         ← filing / memory surface (separate)
fapo-ran                                  ← RAN only (separate)
```

## What this repo owns

| Owns | Does **not** own |
|------|------------------|
| GSAP Kernel orchestration | Primary intellect (Cybernetic-Ava007) |
| Capability *contracts* and lifecycle | CUDA / PyTorch / TensorRT *workers* (Omni-OS) |
| State composition · routing | Android / Termux / SDR *hardware planes* (Omni-OS) |
| Substrate for void / curation workstation | Agent Browser *engine* (Omni-OS) |
| Super-refactor observe/measure/propose | Full memory authority (Forged) |
| | RAN (fapo-ran) |

**Rule:** Exoskeleton asks Omni-OS for capabilities. It does not embed Linux, GPU, modem, or browser stacks.

## Related repos

| Repo | Role |
|------|------|
| [Cybernetic-Ava007](https://github.com/ingeniosity-A2A/Cybernetic-Ava007) | Intellect |
| [Ava007-Omni-OS](https://github.com/ingeniosity-A2A/Ava007-Omni-OS) | Environments / devices / compute / browser |
| [Forged-Filing-Sys](https://github.com/ingeniosity-A2A/Forged-Filing-Sys) | Filing surface |
| [Agent-X](https://github.com/ingeniosity-A2A/Agent-X) | Edge skill execution |
| [fapo-ran](https://github.com/ingeniosity-A2A/fapo-ran) | RAN |

## Docs

- [docs/ARCHITECTURE_BOUNDARIES.md](docs/ARCHITECTURE_BOUNDARIES.md) — hard boundaries
- [docs/SOURCES_REGISTRY.md](docs/SOURCES_REGISTRY.md) — design source index
- [CONSOLIDATION.md](CONSOLIDATION.md) — legacy merge notes (historical)

## Dependency Management

This repository currently has no Node.js package manifests, so it intentionally has no pnpm workspace or lockfile. Use Cargo for Rust dependencies and the existing Python project metadata for Python dependencies. Do not copy a pnpm lockfile from Ava007 or Agent-X into this repository. If a Node.js package is added here later, pin `pnpm@12.10.0`, define its workspace at the repository root, and commit the generated `pnpm-lock.yaml` after a successful local install.
