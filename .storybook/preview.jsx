import styled from "@emotion/styled"
import { EinrideProvider } from "../src/contexts/EinrideProvider"
import { useDarkMode } from "storybook-dark-mode"
import { themes } from "@storybook/theming"
import { color } from "../src/primitives/color"

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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  backgrounds: {
    values: [
      { name: "light", value: color.greyscale.white },
      { name: "dark", value: color.greyscale.black },
    ],
  },
  layout: "fullscreen",
  darkMode: {
    dark: {
      ...themes.dark,
      appBg: color.greyscale.grey100,
      appContentBg: color.greyscale.black,
      appBorderColor: color.greyscale.grey80,
      barBg: color.greyscale.grey100,
      inputBg: color.greyscale.grey100,
    },
  },
}

const theme = {
  fonts: {
    body: "SuisseIntl, EinrideIcons, sans-serif",
    heading: "SuisseIntl, EinrideIcons, sans-serif",
  },
}

export const decorators = [
  (Story) => {
    const colorMode = useDarkMode() ? "dark" : "light"
    return (
      <EinrideProvider theme={theme} colorMode={colorMode}>
        <Wrapper>
          <Story />
        </Wrapper>
      </EinrideProvider>
    )
  },
]

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.grid.gap};
`
