module.exports = {
  extends: ["plugin:@einride/default"],
  rules: {
    "react/jsx-props-no-spreading": "off", // props spreading is good practice in a component library
  },
  overrides: [
    {
      files: ["src/*.tsx"],
      excludedFiles: "*.stories.tsx",
      rules: {
        "react/react-in-jsx-scope": "error",
      },
    },
  ],
}
