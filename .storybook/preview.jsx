import styled from "@emotion/styled"
import { EinrideProvider } from "../src/lib/EinrideProvider/EinrideProvider"
import { useDarkMode } from "storybook-dark-mode"

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
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#121212" },
    ],
  },
  layout: "fullscreen",
}

const theme = {
  fonts: {
    body: "SuisseIntl, EinrideIcons, sans-serif",
    heading: "SuisseIntl, EinrideIcons, sans-serif",
  },
}

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? "dark" : "light"
    return (
      <EinrideProvider theme={theme} colorMode={mode}>
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
