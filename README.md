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
- [pnpm Skill](.agents/skills/pnpm/SKILL.md) — shared pnpm retrieval and verification contract
- [docs/PNPM_DEPLOYMENT.md](docs/PNPM_DEPLOYMENT.md) — pnpm setup and deployment commands
- [docs/PNPM_ROLLOUT_STATUS.md](docs/PNPM_ROLLOUT_STATUS.md) — detailed cross-repository remaining work and certification checklist
- [CONSOLIDATION.md](CONSOLIDATION.md) — legacy merge notes (historical)

## Development and deployment

The repository root pins pnpm 12.10.0 as the task and deployment entry point. Rust dependencies remain managed by Cargo; Python dependencies remain managed by pip/setuptools. Start with `corepack enable && corepack prepare pnpm@12.10.0 --activate`, then run `pnpm install` and commit the generated root lockfile. Build/run the Rust service with `pnpm run build` / `pnpm run dev`; install Python support only when needed with `pnpm run setup:python`. The lockfile and local install have not yet been generated in this environment.


Shared package-manager guidance: [pnpm Skill](../.agents/skills/pnpm/SKILL.md) (includes the release blog and upstream migration/performance references).
