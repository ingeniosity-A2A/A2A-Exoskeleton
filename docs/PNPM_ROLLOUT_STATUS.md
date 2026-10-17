# pnpm rollout status

Status: **prepared, not yet install-certified**. All JavaScript packages should use the same pnpm release and migration sequence, but each Git repository keeps its own workspace and lockfile because each deploys independently.

## Shared package setup pattern

Apply this checklist to every Node package/workspace:

1. Pin `packageManager: pnpm@12.10.0` and Node.js `>=22.13.0`; verify with `pnpm --version`.
2. Declare all packages in the repo's `pnpm-workspace.yaml`. Put pnpm settings such as `allowBuilds`, catalogs, and workspace options there using camelCase. Keep `.npmrc` limited to registry/auth.
3. Generate the pnpm lock from the actual manifests. Use `pnpm import` only for npm/Yarn lockfiles. For Bun-only projects, use `pnpm install --lockfile-only`; review the resolution. Do not claim old Bun lockfiles were imported.
4. Review dependency build-script approval, commit the `allowBuilds` policy and `pnpm-lock.yaml`, then validate with `pnpm install --frozen-lockfile`.
5. Run the package's existing build/typecheck/smoke/deploy checks. Change CI/Docker/deploy installs to frozen pnpm only after the lock and package build pass.
6. Remove old npm/Bun locks only after the corresponding pnpm install and app checks pass. Keep the old versions in Git history for rollback.

Use `pnpm install --frozen-lockfile --prefer-offline` when the local shared store is warm. Keep the pnpm content-addressed store shared across repos on a developer machine; do not share `node_modules` or lockfiles across independent repos.

## Repository checklist

| Repository | Existing state | Remaining work |
|---|---|---|
| [a2a-exoskeleton PR #1](https://github.com/ingeniosity-A2A/a2a-exoskeleton/pull/1) | Root pnpm task wrapper and skill added; Cargo/Python remain separate ecosystems. | On a machine with pnpm 12.10.0, run root `pnpm install` and commit `pnpm-lock.yaml`; validate frozen install, `pnpm run check:rust`, and `pnpm run build`. Run Python setup/check only on hosts that need the optional Python package. |
| [Agent-X PR #5](https://github.com/ingeniosity-A2A/Agent-X/pull/5) | `platform/` already has pnpm workspace/lock. ESA and docs-pipeline are independent packages pinned to the shared pnpm version. | In `platform/`, run frozen install, build and lint. In `esa-exoskeleton/`, generate/commit its lock with `pnpm install`, approve needed Wrangler/DuckDB build scripts, then build/dev check and validate Pages deploy. In `modules/document-ingestion/docs-pipeline/`, import its npm lock with `pnpm import`, review/commit, then frozen install and start check. Convert remaining install commands/CI for these packages; remove old lockfiles after passing checks. |
| [Ava007 PR #35](https://github.com/ingeniosity-A2A/Ava007/pull/35) | Root workspace includes root app, dashboard, intellect gateway and AMOS dashboard; old npm locks remain. | At repo root, generate and review one workspace lock from manifests; full install and build each workspace package. Approve required native/build scripts. Then change `packages/amos/Dockerfile`, deploy workflow, and other npm CI/scripts to use pinned pnpm and frozen install; delete obsolete npm locks only after end-to-end deploy checks. |
| [Omni-OS PR #2](https://github.com/ingeniosity-A2A/Ava007-Omni-OS/pull/2) | Root Vite app, Agent Browser and Forged Next app are described in one pnpm workspace; previous Bun locks remain. | Generate/review workspace lock with `pnpm install --lockfile-only` (Bun locks are not import sources), full install and approve needed build scripts. Verify root typecheck/build, browser smoke, Forged build, Wrangler Pages deploy and Docker compose build. Update CI/deployment installs, then remove Bun locks after checks pass. |

## Final certification gate

Each PR is ready to leave draft only after its applicable checklist is complete and recorded: pinned pnpm/Node versions, committed lockfile, approved build scripts, frozen install, successful app builds, and the actual deployment path. Do not label a repository certified based on documentation or lock generation alone.

The [shared pnpm Skill](../.agents/skills/pnpm/SKILL.md) is the source map for current upstream guidance and release updates. Shared UI/skill code across separate repositories still needs an explicit versioned package/config dependency; a shared pnpm version does not itself share code.
