# Framework Dependency Intelligence Contract

**Dependencies are part of the system's intelligence surface.** Every dependency and runtime component must be inventoried, explained, monitored for change, and validated against the capability contracts and lifecycle it supports.

## Ownership

- Cybernetic-Ava007 owns dependency knowledge used for reasoning, curation, refactoring, and evaluation.
- SPARC owns dependency-aware refactor intake and evidence gates.
- Exoskeleton owns runtime/capability contract compatibility, lifecycle consequences, and rollback requirements.
- Omni-OS and Agent-X own their respective operating-system, device, browser, compute, execution, native, and adapter dependencies.
- No repository may update another repository's dependencies by silently editing its manifests or lockfiles.

## Required dependency intelligence

For every ecosystem, retain:

- Direct and transitive graph, resolved versions, lockfile or equivalent resolution evidence, and provenance.
- Current stable release, upstream release notes, deprecations, supported runtimes/platforms, and breaking changes.
- Vulnerability/advisory state, publisher and artifact integrity signals, licenses, maintenance health, and native/build-script behavior.
- Reverse dependency impact, API/ABI and capability-contract compatibility, evaluation results, exact evidence digests, and rollback target.
- Explicit status: current, update-required, blocked, or validation-pending. Unknown is not equivalent to passing.

## Automatic freshness policy

- Discover updates continuously or on a scheduled host process; do not depend on a person remembering to inspect versions.
- Permit major-version updates; do not silently hold stale versions because a new release requires migration work.
- Update the correct ecosystem's manifests and lockfiles, resolve the complete graph, audit supply-chain/security information, and run the relevant test/evaluation suite.
- Only mark an update accepted after evidence-bound validation. If the latest release breaks compatibility, retain a visible blocker and migration plan; never suppress the failure or call the dependency current.
- The dependency-intelligence service in Cybernetic-Ava007 is the initial pnpm implementation. Cargo, Python, system packages, container base images, native toolchains, and other ecosystems need their own adapters and evidence contracts before the framework can claim complete coverage.

## Exoskeleton-specific gates

Before a dependency update can affect a capability contract or runtime path, validate:

1. Contract/schema compatibility and orchestration semantics.
2. Lifecycle behavior: discover, select, allocate, execute, observe, interrupt, reverse, release.
3. Failure handling, cancellation, timeout, resource release, and rollback behavior.
4. Security boundaries, identity/permissions, artifact provenance, and supply-chain status.
5. Regression evidence against the exact candidate and dependency graph digest.

A package update cannot authorize execution, override AVA-007's governance, bypass Manifesto/canon gates, or promote an unvalidated skill.

## Automation boundary

GitHub Actions are not required. Periodic work must run on an approved, persistent host scheduler with a checkout and the appropriate least-privilege credentials. A committed script or policy is not itself an active scheduler. Scheduled jobs must preserve logs and evidence and must not push an update to a canonical branch unless the configured validation gates pass and the operator has explicitly enabled direct-push behavior.
