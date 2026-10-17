# Exoskeleton development and deployment

pnpm 12.10.0 is the version-pinned entry point for repository tasks and deployment orchestration. Cargo remains authoritative for Rust dependencies; Python packaging remains authoritative for Python dependencies. The pnpm manifest does not mirror or replace either dependency graph.

## Prerequisites

Install Node.js 22.13+, Rust/Cargo, and Python 3.10+. Activate the pinned pnpm:

```sh
corepack enable
corepack prepare pnpm@12.10.0 --activate
pnpm install
```

Commit the generated `pnpm-lock.yaml` after a successful install. Once present, use `pnpm install --frozen-lockfile` in automation.

## Build and run the Rust service

```sh
pnpm run check:rust
pnpm run build
pnpm run dev
```

The Rust crate is `rust/Cargo.toml`; Cargo resolves and locks its dependencies in `Cargo.lock`.

## Python package (optional)

```sh
pnpm run setup:python
pnpm run check:python
```

The Python extras include large ML dependencies. Install them only on hosts that need the Python package; the Rust build does not install them. Use the target host's supported Python environment and keep model weights and runtime data outside this repository.

## Deployment boundary

This repository provides the GSAP orchestration substrate and capability contracts. Deploy the compiled Rust service on the selected host, then connect Omni-OS and Agent-X using their own deployment configuration. pnpm coordinates repository commands; it does not deploy those external systems or replace their runtime-specific tools.
