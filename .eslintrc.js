module.exports = {
  extends: ["plugin:@einride/default", "plugin:storybook/recommended"],
  rules: {
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "import/no-default-export": "off", // storybook requires default exports in stories
      },
    },
  ],
}
