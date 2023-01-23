import image from "@rollup/plugin-image"
import typescript from "@rollup/plugin-typescript"
import pkg from "./package.json" assert { type: "json" }

export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/ui.js",
      format: "cjs",
    },
    {
      file: "dist/ui.mjs",
      format: "esm",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    "react/jsx-runtime",
  ],
  plugins: [image(), typescript({ tsconfig: "./tsconfig.build.json" })],
}
