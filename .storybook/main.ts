import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import turbosnap from "vite-plugin-turbosnap"

export default {
  stories: [
    "../packages/einride-ui/src/docs",
    "../packages/einride-ui/src/components",
    {
      directory: "../packages/einride-ui-maps/src/assets",
      titlePrefix: "maps",
    },
    {
      directory: "../packages/einride-ui-maps/src/components",
      titlePrefix: "maps",
    },
    {
      directory: "../packages/einride-ui-maps/src/hooks",
      titlePrefix: "maps",
    },
  ],
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
} satisfies StorybookConfig
