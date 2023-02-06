import styled from "@emotion/styled"
import { themes } from "@storybook/theming"
import { useEffect } from "react"
import { useDarkMode } from "storybook-dark-mode"
import { useColorScheme } from "../src/contexts/ColorSchemeProvider"
import { EinrideProvider } from "../src/contexts/EinrideProvider"
import { einrideTheme } from "../src/lib/theme/einride"
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
  chromatic: {
    disableSnapshot: true,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  backgrounds: {
    values: [
      { name: "light", value: color.white },
      { name: "dark", value: color.black },
    ],
  },
  layout: "fullscreen",
  darkMode: {
    dark: {
      ...themes.dark,
      appBg: color.grey[90],
      appContentBg: color.black,
      appBorderColor: color.grey[60],
      barBg: color.grey[90],
      inputBg: color.grey[90],
    },
  },
}

export const decorators = [
  (Story, options) => {
    const colorMode = useDarkMode() ? "dark" : "light"
    return (
      <EinrideProvider theme={einrideTheme} colorMode={colorMode}>
        <SetupColorScheme colorScheme={colorMode}>
          <Wrapper style={options.args.style}>
            <Story />
          </Wrapper>
        </SetupColorScheme>
      </EinrideProvider>
    )
  },
]

const SetupColorScheme = ({ children, colorScheme }) => {
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme(colorScheme)
  }, [colorScheme])

  return <>{children}</>
}
const Wrapper = styled.div`
  padding: ${({ theme }) => 3 * theme.spacingBase}rem;
`
