# Agent Development Guidelines

Guidelines for AI agents and human contributors working on `vp-xlsx`.

This project manages dependencies with `npm` and runs the project-local Vite+ (`vp`) toolchain (`node_modules/.bin/vp`) through `npm run <script>` without relying on a global `vp` CLI or `pnpm`.

## 1. Quick Architecture Map

| Layer                 | Path                     | Responsibility                                                          |
| :-------------------- | :----------------------- | :---------------------------------------------------------------------- |
| **Source Entry**      | `main.ts`                | Excel import, Zod validation, data transformation (`parse`), and export |
| **Test Suite**        | `main.test.ts`           | Vitest unit tests via `vite-plus/test`                                  |
| **Toolchain Config**  | `vite.config.ts`         | Single source of truth for packaging (`pack`), linting, and formatting  |
| **TypeScript Config** | `tsconfig.json`          | Strict compiler configuration and type definitions                      |
| **Package Manifest**  | `package.json`           | `npm` scripts invoking local `vp`, dependencies, and `overrides`        |
| **npm Policy**        | `.npmrc`                 | Strict supply-chain and lockfile configuration                          |
| **Sample Data**       | `data/data.example.xlsx` | Minimal input data verification fixture                                 |

---

## 2. Core SSOT & Architectural Invariants

- **Single Source of Truth (SSOT)**: Toolchain configuration is consolidated inside `vite.config.ts`. Avoid redundant config files (`.prettierrc`, `.oxlintrc.json`, `eslint.config.*`).
- **npm-Managed Project-Local `vp`**: Manage dependencies with `npm` (`npm ci`, `npm install`, `npm pkg get/set/delete/fix`) and invoke project-local `vp` through `package.json` scripts (`npm run <script>`) or `npx vp <cmd>` rather than relying on global `vp` or `pnpm`. When upgrading `vite-plus`, keep `package.json` `overrides.vite` (`npm:@voidzero-dev/vite-plus-core@<core-version>`) and `overrides.vitest` (`<vitest-version>`) synchronized with `npx vp toolchain`.
- **Strict `.npmrc` Policy**: Keep `audit=false`, `engine-strict=true`, `fund=false`, `ignore-scripts=true`, `install-strategy=linked`, `save-exact=true`, and `strict-peer-deps=true` in `.npmrc`.
- **Zero Suppression Policy**: Never use `// @ts-ignore`, `// @ts-expect-error`, or `/* oxlint-disable */` to bypass diagnostics.
- **Pure ESM & Active LTS**: Use pure ESM on `fnm`-managed Node.js Active LTS (`engines.node` enforced via `engine-strict=true`). Run the compiled bundle via `npm start` (`node dist/main.mjs`).

---

## 3. Verification Ladder

- **Inner Loop**: `npm run agent:verify:inner` (`npm run typecheck && npm run check`)
- **Fast Check**: `npm run check:fast` (`npm run typecheck && npm run lint && npm run agent:test:unit`)
- **Unit Suite**: `npm run agent:test:unit` (`vp test run --reporter=tap-flat --no-color`)
- **Unit Verification**: `npm run agent:verify:unit` (`npm run agent:verify:inner && npm run agent:test:unit`)
- **Unified Gate**: `npm run agent:verify:gate` (`npm run agent:verify:unit && npm run build`)
- **Full Verification**: `npm run verify` (`npm run typecheck && npm run check && npm test && npm run build`)
- **Direct Local `vp` Shortcuts**: `npm run check`, `npm run agent:lint:fix`, `npm run fmt`, `npm run fmt:check`, `npm run lint`, `npm run pack` / `npm run build`, `npm test`, `npm start`

---

## 4. Git Workflow & Commit Restrictions

- **NEVER execute `git commit` directly**: AI direct commits are prohibited machine-wide.
- **Protocol**: Stage changes with `git add <files>` and output the exact `git commit -m "..."` command following Conventional Commits for manual execution by the user.

---

## 5. Language & Planning Standards

- **Traditional Chinese for Plans & Responses**: All implementation plans (`/plan`), walkthrough artifacts, design documents, and chat responses must strictly be written in **Traditional Chinese (繁體中文)**.
- **Code Artifacts**: Source code, inline comments, commit messages, and automated tests must use concise English.
