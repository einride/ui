module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "storybook-addon-designs",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  staticDirs: ["../public"],
}
