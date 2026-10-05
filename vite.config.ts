import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["main.ts"],
    clean: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    sortPackageJson: true,
  },
});
