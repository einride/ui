module.exports = {
  extends: ["plugin:@einride/default", "plugin:storybook/recommended"],
  root: true,
  rules: {
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
  },
  overrides: [
    // Allow extraneous dependencies in test files
    {
      files: [
        "**/*.test.{ts,tsx}", // test file
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
}
