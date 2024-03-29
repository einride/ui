import styled from "@emotion/styled"
import { ComponentProps, ReactNode, forwardRef } from "react"
import { ColorScheme, useColorScheme } from "../../../contexts/ColorSchemeProvider"
import { BackgroundColor, ContentColor } from "../../../lib/theme/types"
import { Box } from "../../layout/Box/Box"
import { Text } from "../../typography/Text/Text"

type Status = "success" | "warning" | "fail" | "neutral"

export interface BannerProps extends Omit<ComponentProps<"div">, "title" | "color"> {
  /** Status of the banner. */
  status?: Status

  /** Title of the banner. Rendered in `<Text>`. */
  title?: ReactNode

  /** Custom content of the banner. Prefer using `title`. */
  children?: ReactNode
}

/** Banner to show information or inline error messages. */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ status, title, children, ...props }, ref) => {
    const { colorScheme } = useColorScheme()
    return (
      <StyledBanner
        backgroundColor={getMessageBackgroundColor(status)}
        textColor={getMessageColor(status, colorScheme)}
        {...props}
        ref={ref}
      >
        {title && <Text>{title}</Text>}
        {children}
      </StyledBanner>
    )
  },
)

const StyledBanner = styled(Box)<{ backgroundColor: BackgroundColor; textColor: ContentColor }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => 2 * theme.spacingBase}rem;
  background-color: ${({ theme, backgroundColor }) => theme.colors.background[backgroundColor]};
  color: ${({ theme, textColor }) => theme.colors.content[textColor]};
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  position: relative;
`

const getMessageBackgroundColor = (status: Status | undefined): BackgroundColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    case "warning":
      return "warning"
    default:
      return "secondary"
  }
}

const getMessageColor = (status: Status | undefined, colorScheme: ColorScheme): ContentColor => {
  switch (status) {
    case "warning":
      return colorScheme === "dark" ? "primaryInverted" : "primary"
    case "success":
    case "fail":
      return "primaryInverted"
    default:
      return "primary"
  }
}
