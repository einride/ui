import { EinrideProvider } from "../src/lib/EinrideProvider"
import "../src/assets/fonts/einride-icons.css"
import "../src/assets/fonts/fonts.css"
import "../src/styles/main.css";

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
    <EinrideProvider>
        <Story />
    </EinrideProvider>
  )
]
