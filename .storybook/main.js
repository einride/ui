const turbosnap = require("vite-plugin-turbosnap")
const { mergeConfig } = require("vite")

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
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
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === "PRODUCTION" ? [turbosnap({ rootDir: config.root ?? process.cwd() })] : [],
    })
  },
}
