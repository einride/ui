import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import turbosnap from "vite-plugin-turbosnap"

export default {
  stories: ["../src/docs", "../src/components"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-styling",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-coverage",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === "PRODUCTION" ? [turbosnap({ rootDir: config.root ?? process.cwd() })] : [],
    })
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
} satisfies StorybookConfig
