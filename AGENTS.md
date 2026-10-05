<!--VITE PLUS START-->

## Vite+ Guidelines

This project uses Vite+ to manage development tools and runtimes. Always use `vp` (or `vpr` shorthand for `vp run`) to run commands:

- `vp install`: Install dependencies
- `vp test`: Run Vitest tests (unit verification during development)
- `vp pack`: Build library/CLI to `dist/main.mjs` via tsdown
- `vpr start`: Run compiled production JavaScript (`node dist/main.mjs`)
- `vp check`: Run unified formatter, linter, and type checks
- `vp fmt`: Run formatter (Oxfmt)
- `vp lint`: Run linter (Oxlint)

<!--VITE PLUS END-->

# Agent Development Guidelines

Guidelines for AI agents and human contributors working on `vp-xlsx`.

## 1. Quick Architecture Map

| Layer                 | Path                     | Responsibility                                                         |
| :-------------------- | :----------------------- | :--------------------------------------------------------------------- |
| **Source Entry**      | `main.ts`                | Excel import, data transformation (`parse`), and export                |
| **Toolchain Config**  | `vite.config.ts`         | Single source of truth for packaging (`pack`), linting, and formatting |
| **TypeScript Config** | `tsconfig.json`          | Strict compiler configuration and type definitions                     |
| **Sample Data**       | `data/data.example.xlsx` | Minimal input data verification fixture                                |

---

## 2. Core SSOT & Architectural Invariants

- **Single Source of Truth (SSOT)**: Toolchain configuration is consolidated inside `vite.config.ts`. Avoid redundant config files (`.prettierrc`, `.oxlintrc.json`).
- **Native `vp` Priority**: Leverage native `vp` capabilities (`vp check`, `vp pack`, `vp fmt`, `vp lint`) directly rather than creating redundant wrapper scripts in `package.json`.
- **Zero Suppression Policy**: Never use `// @ts-ignore`, `// @ts-expect-error`, or `/* oxlint-disable */` to bypass diagnostics.
- **Pure ESM & Active LTS**: Use pure ESM and Vite+ managed Node.js runtime (`vp node`).

---

## 3. Git Workflow & Commit Restrictions

- **NEVER execute `git commit` directly**: AI direct commits are prohibited machine-wide.
- **Protocol**: Stage changes with `git add <files>` and output the exact `git commit -m "..."` command following Conventional Commits for manual execution by the user.

---

## 4. Language & Planning Standards

- **Traditional Chinese for Plans & Responses**: All implementation plans (`/plan`), walkthrough artifacts, design documents, and chat responses must strictly be written in **Traditional Chinese (繁體中文)**.
- **Code Artifacts**: Source code, inline comments, commit messages, and automated tests must use concise English.
