# template-xlsx-parser

A lightweight template for parsing and processing Excel (.xlsx) files using Node.js and TypeScript, powered by Vite+.

## Quick Start

```sh
# 1. Install dependencies
vp install

# 2. Place your source data at data/data.example.xlsx

# 3. Run tests during development (powered by Vitest via Vite+)
vp test

# 4. Build for production (compiles main.ts into dist/main.mjs via tsdown)
vp pack

# 5. Production run (runs compiled JavaScript)
vpr start

# 6. Unified static check (formatter, linter, and type checks)
vp check
```

## Customization

Modify `main.ts` to adjust the `InputRowT` / `OutputRowT` interfaces and write your custom data transformation logic inside the `parse()` function.

## License

MIT
