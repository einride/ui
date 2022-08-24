// eslint-disable-next-line import/no-extraneous-dependencies
import typescript from "@rollup/plugin-typescript"
// eslint-disable-next-line import/no-extraneous-dependencies
import copy from "rollup-plugin-copy"

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
  plugins: [
    typescript({ tsconfig: "./tsconfig.build.json" }),
    copy({
      targets: [
        { src: ["src/mapIcons/*.svg"], dest: ["dist/cjs/lib/mapIcons", "dist/esm/lib/mapIcons"] },
      ],
    }),
  ],
}
