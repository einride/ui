module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "storybook-addon-designs",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => {
        const filteredProp =
          prop.parent?.fileName.includes("node_modules") || prop.parent === undefined
        return !filteredProp
      },
    },
  },
}
