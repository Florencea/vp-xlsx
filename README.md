# vp-xlsx

A lightweight, type-safe library and CLI for parsing and processing Excel (`.xlsx`) files using Node.js, TypeScript, and Zod, powered by project-local Vite+ (`vp`) invoked through `npm`.

## Prerequisites

- Node.js Active LTS managed via `fnm` (exact version pinned in `package.json` `engines.node`)
- `npm`

## Quick Start

```sh
# 1. Install dependencies from package-lock.json
npm ci

# 2. Place your source data at data/data.example.xlsx

# 3. Run tests during development (powered by Vitest via local vp)
npm test

# 4. Build for production (compiles main.ts into dist/main.mjs via tsdown)
npm run build

# 5. Production run (runs compiled JavaScript)
npm start

# 6. Unified static check (Oxfmt, Oxlint, and type checks via local vp)
npm run check
```

## Package Management Policy

- Dependencies and lockfiles are managed with `npm` (`npm ci` for clean installs, `npm install` for dependency updates).
- `.npmrc` enforces `audit=false`, `engine-strict=true`, `fund=false`, `ignore-scripts=true`, `install-strategy=linked`, `save-exact=true`, and `strict-peer-deps=true`.
- Project-local `vp` is executed through `package.json` scripts (`npm run <script>`) or `npx vp <cmd>` without requiring a global `vp` CLI.
- When upgrading `vite-plus`, keep `overrides.vite` and `overrides.vitest` in `package.json` aligned with `npx vp toolchain`.

## Available Scripts

- `npm run check`: Run unified Oxfmt format check, Oxlint, and type-aware check (`vp check`).
- `npm run fmt`: Format source and manifest files with Oxfmt (`vp fmt`).
- `npm run fmt:check`: Verify formatting without modifying files (`vp fmt --check`).
- `npm run lint`: Run Oxlint checks (`vp lint`).
- `npm run typecheck`: Run TypeScript type checking (`tsc --noEmit --pretty false`).
- `npm test`: Run Vitest tests via local `vp` (`vp test run`).
- `npm run build` / `npm run pack`: Build `dist/main.mjs` via tsdown (`vp pack`).
- `npm start`: Run compiled production JavaScript (`node dist/main.mjs`).
- `npm run check:fast`: Run `typecheck`, `lint`, and TAP unit tests.
- `npm run verify`: Run `typecheck`, `check`, `test`, and `build`.
- `npm run agent:lint:fix`: Auto-fix formatting and lint issues (`vp check --fix`).
- `npm run agent:test:unit`: Run Vitest with flat TAP output and no color.
- `npm run agent:verify:inner`: Run `typecheck` and `check`.
- `npm run agent:verify:unit`: Run `agent:verify:inner` and `agent:test:unit`.
- `npm run agent:verify:gate`: Run `agent:verify:unit` and `build`.

## Customization

Modify `main.ts` to adjust the `InputRowT` / `OutputRowT` interfaces and write your custom data transformation logic inside the `parse()` function.

## License

MIT
