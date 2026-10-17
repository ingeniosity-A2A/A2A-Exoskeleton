---
name: pnpm
description: Shared pnpm operating skill for the Ava007, Exoskeleton, Agent-X, and Omni-OS repositories. Use for workspace setup, migration, dependency resolution, lockfiles, CI, deployment, or pnpm performance.
---

# pnpm Skill

## Purpose

Use this file as the shared map and operating contract for pnpm. Upstream documentation is the knowledge source; this skill stores the retrieval paths and local rules, not a copied pnpm manual.

## Canonical sources

- [pnpm skill index](https://github.com/antfu/skills/tree/main/skills/pnpm)
- [pnpm SKILL.md](https://github.com/antfu/skills/blob/main/skills/pnpm/SKILL.md)
- [Migration practices](https://github.com/antfu/skills/blob/main/skills/pnpm/references/best-practices-migration.md)
- [Performance practices](https://github.com/antfu/skills/blob/main/skills/pnpm/references/best-practices-performance.md)
- [pnpm documentation](https://pnpm.io/)
- [pnpm release blog](https://pnpm.io/blog?type=releases)

Check the release blog when a task depends on new behavior, security fixes, migration notes, or a proposed version update. Verify details against the release post and current official docs; do not treat a blog headline as local runtime proof.

## Local compatibility contract

- Standard repository pin: `pnpm@12.10.0`, Node.js `>=22.13.0`, unless a repository explicitly documents a different certified pin.
- Read `package.json`, `pnpm-workspace.yaml`, lockfiles, deployment workflows, and package scripts before changing configuration.
- pnpm 11+ configuration belongs in `pnpm-workspace.yaml` with camelCase keys. Keep `.npmrc` for registry/auth settings only. Do not rely on the legacy `package.json#pnpm` config field.
- Workspaces share a lockfile only inside one repository checkout. Cross-repository packages/configuration require an explicit published package, pinned Git dependency, or pnpm config dependency; matching version pins alone do not share code.
- Keep service/runtime boundaries intact. pnpm installs JS packages and can run scripts; Cargo, Python, Docker, and deployment platforms retain their own dependency/runtime responsibilities.
- Never claim migration certification without a generated and reviewed lockfile, a frozen install, approved dependency build scripts, and the relevant build/deploy checks.

## Retrieval and verification cycle

1. Identify the pnpm operation, repository, and pinned pnpm version.
2. Retrieve only the relevant upstream slice: migration for package-manager conversion; workspace/catalog/config references for shared packages; performance/CI guidance for installs or deploy pipelines.
3. Check the current release blog if behavior may have changed since the cached source.
4. Apply the smallest change that respects the repository's existing package and deployment boundaries.
5. Verify against the actual lockfile, package scripts, and runtime. Distinguish upstream documentation from commands and builds verified in that repository.
6. Record the source URL, reviewed version/date, local command output, and any unresolved migration step.

If upstream sources cannot be reached, state the age/scope of cached evidence and whether it is enough for the requested change. Do not silently claim fresh retrieval.
