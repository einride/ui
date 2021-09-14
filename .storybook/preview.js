import { EinrideProvider } from "../src/lib/EinrideProvider"
import "./lib/fonts.css"

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
}

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
}

const theme = {
  fonts: {
    body: "SuisseIntl, EinrideIcons, sans-serif",
    heading: "SuisseIntl, EinrideIcons, sans-serif",
  },
}

export const decorators = [
  (Story) => (
    <EinrideProvider theme={theme}>
      <Story />
    </EinrideProvider>
  ),
]
