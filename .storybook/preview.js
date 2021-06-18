import { ThemeProvider } from "theme-ui"
import "../src/styles/main.css";
import "../src/styles/typography.css";
import "../src/styles/variables.css";
import { theme } from "../src/theme";

const customViewports = {
  small: {
    name: "Small",
    styles: {
      width: "375px",
      height: "672px",
    },
  },
  medium: {
    name: "Medium",
    styles: {
      width: "1024px",
      height: "800px",
    },
  },
  large: {
    name: "Large",
    styles: {
      width: "1440px",
      height: "800px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: { viewports: customViewports },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#121212" },
    ],
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
        <Story />
    </ThemeProvider>
  )
]
