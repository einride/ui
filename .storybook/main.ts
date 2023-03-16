import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import turbosnap from "vite-plugin-turbosnap"

export default {
  stories: ["../src/docs", "../src/components"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "storybook-dark-mode-v7", // TODO: switch back to storybook-dark-mode when support for Storybook v7 is released
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
} satisfies StorybookConfig
