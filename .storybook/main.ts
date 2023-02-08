import { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    {
      directory: "../src/templates",
      files: "**/*.stories.@(mdx|tsx)",
    },
    {
      directory: "../src/components",
      files: "**/*.stories.@(mdx|tsx)",
    },
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "storybook-dark-mode",
    "@storybook/addon-coverage",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: true,
  },
}

export default config
