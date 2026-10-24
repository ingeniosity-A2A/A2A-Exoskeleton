# A2A-Exoskeleton — Retirement / Migration Notice

**This repository is retiring as an active implementation location. Do not add new runtime code here.** The architecture and implementation work is being reassigned by ownership boundary; this repository remains available as historical provenance until the migration is reviewed and the replacement is verified.

## Canonical destination map

| Responsibility / asset | Destination | Migration rule |
|---|---|---|
| Air-LLM / Air-Ava007 Rust substrate; canonical timeline; Rust-native verification contracts; RF/device execution | [MA-Edge-Computing/air-ava007](https://github.com/ingeniosity-A2A/MA-Edge-Computing/tree/main/air-ava007) | Air-Ava007 is the canonical name. Keep Rust workspace, TurboVec/TurboQuant adapters, ledger, and Rev.ike gate in this edge-owned workspace. |
| Ava-007 reasoning, learning, candidate generation, intelligence policies | [Cybernetic-Ava007](https://github.com/ingeniosity-A2A/Cybernetic-Ava007) | Move intellect logic only; do not move device drivers or the RF plane into the intellect repository. |
| Device, browser, network, compute and operating environment integration | [Ava007-Omni-OS](https://github.com/ingeniosity-A2A/Ava007-Omni-OS) | Keep environment adapters and integration surfaces here. |
| GSAP scheduling semantics, dependency ordering, synchronization, cancellation, lifecycle and canonical timeline contract | [MA-Edge-Computing/air-ava007](https://github.com/ingeniosity-A2A/MA-Edge-Computing/tree/main/air-ava007) | Preserve orchestration as a control-flow/lifecycle contract; do not reduce GSAP to animation/interpolation. |

## Canonical position statement

> TurboVec proposes, TurboQuant compresses, Rev.ike verifies, GSAP schedules — logically in the application, physically in the RF domain — and the canonical timeline arbitrates in both, with quantization distortion reported to the gate that decides whether the turn is failed.

Rust is the deterministic substrate. Quantum-inspired methods remain optional and must be evaluated against classical baselines; they are not the system's core and no superiority claim is accepted without reproducible evidence.

The preserved statement and conclusion are recorded in [Air-Ava007 WHITEPAPER.md](https://github.com/ingeniosity-A2A/MA-Edge-Computing/blob/main/air-ava007/WHITEPAPER.md).

## Retirement safety rules

1. Do not delete historical source files until each source path is inventoried and its destination copy is verified.
2. Preserve commit history/provenance where practical; cross-repository copy is not a Git rename and does not automatically preserve history.
3. Mark benchmark claims as reported until trace artifacts, dataset versions, commands, commit SHA, device/runtime metadata and reproducible results exist.
4. C2 device sweep and C3 real-corpus recall remain the priority evidence gates. Neither is considered passed merely because a runner or interface exists.
5. No GitHub Actions workflow is introduced by this retirement change.

This notice retires the repository as an active owner; it does not falsely claim that every legacy file has already been transferred. The old root does not currently expose an `air-llm/` directory at the checked path, so that named tree must be located in its actual source branch/repository before destructive deletion can be safe.
