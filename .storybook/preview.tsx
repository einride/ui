import styled from "@emotion/styled"
import { DocsContainer } from "@storybook/blocks"
import { Preview, StoryContext, StoryFn } from "@storybook/react"
import { themes } from "@storybook/theming"
import React, { CSSProperties, ReactNode, useEffect } from "react"
import { useDarkMode } from "storybook-dark-mode-v7"
import {
  ColorScheme,
  useColorScheme,
} from "../packages/einride-ui/src/contexts/ColorSchemeProvider"
import { EinrideProvider } from "../packages/einride-ui/src/contexts/EinrideProvider"
import { einrideTheme } from "../packages/einride-ui/src/lib/theme/einride"
import { color } from "../packages/einride-ui/src/primitives/color"

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

const parameters = {
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
  docs: {
    container: (props) => (
      <EinrideProvider colorMode="light">
        <DocsContainer {...props} />
      </EinrideProvider>
    ),
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

const decorators = [
  (Story: StoryFn, options: StoryContext) => {
    const colorMode = useDarkMode() ? "dark" : "light"
    if (options.name === "Snapshot") {
      return <Story />
    }
    return (
      <EinrideProvider theme={einrideTheme} colorMode={colorMode}>
        <SetupColorScheme colorScheme={colorMode}>
          <Wrapper style={options.args.style as CSSProperties}>
            <Story />
          </Wrapper>
        </SetupColorScheme>
      </EinrideProvider>
    )
  },
]

interface SetupColorSchemeProps {
  children: ReactNode
  colorScheme: ColorScheme
}

const SetupColorScheme = ({ children, colorScheme }: SetupColorSchemeProps) => {
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme(colorScheme)
  }, [colorScheme])

  return <>{children}</>
}

const Wrapper = styled.div`
  padding: ${({ theme }) => 3 * (theme as any).spacingBase}rem;
`

export default {
  parameters,
  decorators,
} satisfies Preview