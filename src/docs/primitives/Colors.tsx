import styled from "@emotion/styled"
import { ColorScheme } from "../../contexts/ColorSchemeProvider"
import { EinrideProvider } from "../../contexts/EinrideProvider"
import { useTheme } from "../../hooks/useTheme"
import { ColorTheme } from "../../lib/theme/types"

const ThemeColor = ({ color }: { color?: keyof ColorTheme }): React.JSX.Element => {
  const themes = useTheme()
  const theme = color ? themes.colors[color] : themes.colors

  return (
    <OuterWrapper
      background={themes.colors.background.primary}
      color={themes.colors.content.primary}
    >
      {(Object.keys(theme) as Array<keyof typeof theme>).map((key) => {
        if (typeof theme[key] === "string") {
          return (
            <ColorWrapper key={key}>
              <Color background={theme[key]} />
              <Text>{`${key}: ${theme[key]}`}</Text>
            </ColorWrapper>
          )
        }
        return null
      })}
    </OuterWrapper>
  )
}

export const ThemeColorWrapper = ({
  colorScheme = "light",
  ...args
}: {
  colorScheme?: ColorScheme
  color?: keyof ColorTheme
}): React.JSX.Element => {
  return (
    <EinrideProvider colorMode={colorScheme}>
      <ThemeColor {...args} />
    </EinrideProvider>
  )
}

const OuterWrapper = styled("div", {
  shouldForwardProp: (propName) => propName !== "color",
})<{ background: string; color: string }>`
  display: flex;
  flex-wrap: wrap;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: ${({ theme }) => 2 * theme.spacingBase}rem;
`

const ColorWrapper = styled.div`
  margin-block-end: ${({ theme }) => theme.spacingBase}rem;
  flex: 0 0 50%;
  display: flex;
  align-items: center;
`

const Color = styled.div<{ background: string }>`
  padding: ${({ theme }) => 2 * theme.spacingBase}rem;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  margin-inline-end: ${({ theme }) => 2 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 4 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 4 * theme.spacingBase}rem;
  border-radius: 50%;
  background: ${({ background }) => background};
`

const Text = styled.span``
