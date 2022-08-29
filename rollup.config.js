// eslint-disable-next-line import/no-extraneous-dependencies
import typescript from "@rollup/plugin-typescript"
import svg from "rollup-plugin-svg"
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-default-export
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
  plugins: [svg(), typescript({ tsconfig: "./tsconfig.build.json" })],
}
