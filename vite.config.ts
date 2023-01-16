/// <reference types="vitest" />
import { resolve } from "path"
import typescript from "@rollup/plugin-typescript"
import { defineConfig } from "vite"
import pkg from "./package.json"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        "react/jsx-runtime",
      ],
      plugins: [typescript({ tsconfig: resolve(__dirname, "./tsconfig.build.json") })],
    },
  },
  test: {
    environment: "happy-dom",
  },
})
