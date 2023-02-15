const turbosnap = require("vite-plugin-turbosnap")
const { mergeConfig } = require("vite")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "storybook-dark-mode",
    "@storybook/addon-coverage",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
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
