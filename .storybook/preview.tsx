import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { withThemeFromJSXProvider } from "@storybook/addon-styling"
import { DocsContainer } from "@storybook/blocks"
import { Preview, StoryContext, StoryFn } from "@storybook/react"
import { themes } from "@storybook/theming"
import React, { CSSProperties } from "react"
import { EinrideProvider } from "../packages/einride-ui/src/contexts/EinrideProvider"
import { GlobalStyles } from "../packages/einride-ui/src/lib/GlobalStyles"
import { einrideTheme } from "../packages/einride-ui/src/lib/theme/einride"
import { themes as einrideThemes } from "../packages/einride-ui/src/lib/theme/theme"
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
    canvas: {
      sourceState: "shown",
    },
    source: {
      language: "tsx",
    },
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
  withThemeFromJSXProvider({
    themes: { light: einrideThemes.light, dark: einrideThemes.dark },
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyles,
    defaultTheme: "light",
  }),
  (Story: StoryFn, options: StoryContext) => {
    if (options.name === "Snapshot") {
      return (
        <EinrideProvider theme={einrideTheme}>
          <Story />
        </EinrideProvider>
      )
    }
    return (
      <EinrideProvider theme={einrideTheme} colorMode="light">
        <Wrapper style={options.args.style as CSSProperties}>
          <Story />
        </Wrapper>
      </EinrideProvider>
    )
  },
]

const Wrapper = styled.div`
  padding: ${({ theme }) => 3 * (theme as any).spacingBase}rem;
`

export default {
  parameters,
  decorators: decorators as any,
} satisfies Preview
