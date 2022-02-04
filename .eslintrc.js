module.exports = {
  extends: ["plugin:@einride/default", "plugin:storybook/recommended"],
  rules: {
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
    "react/react-in-jsx-scope": "error",
  },
}
