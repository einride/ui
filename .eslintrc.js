module.exports = {
  extends: ["plugin:@einride/default", "plugin:storybook/recommended"],
  rules: {
    "jest/no-deprecated-functions": "off",
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
  },
}
