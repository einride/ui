import image from "@rollup/plugin-image"
import typescript from "@rollup/plugin-typescript"

export default {
  external: [
    "@einride/hooks",
    "@emotion/react",
    "@emotion/styled",
    "@mantine/hooks",
    "framer-motion",
    "lodash.merge",
    "react",
    "react/jsx-runtime",
  ],
  input: "src/main.ts",
  output: [
    {
      file: "dist/cjs/main.js",
      format: "cjs",
    },
    {
      file: "dist/esm/main.js",
      format: "esm",
    },
  ],
  plugins: [image(), typescript({ tsconfig: "./tsconfig.build.json" })],
}
