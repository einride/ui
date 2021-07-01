module.exports = {
  extends: ["plugin:@einride/default"],
  rules: {
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
    "import/no-extraneous-dependencies": "off",
  },
};
