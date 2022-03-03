import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { Icon } from "../../content/Icon/Icon"

export interface ChargerPinProps extends HTMLAttributes<HTMLDivElement> {
  size: Size
}

export const ChargerPin = forwardRef<HTMLDivElement, ChargerPinProps>(
  ({ size = "md", ...props }, ref) => {
    return <StyledIcon size={size} name="bolt" {...props} ref={ref} />
  },
)

type Size = "sm" | "md"

const StyledIcon = styled(Icon)<{ size: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  background: ${({ theme }) => theme.primitives.color.green.default};
  color: ${({ theme }) => theme.primitives.color.greyscale.white};
  border: 2px solid ${({ theme }) => theme.primitives.color.greyscale.white};
  border-radius: 24px;
  font-size: ${({ size, theme }) => getFontSize(size, theme)};
`

const getSize = (size: Size) => {
  switch (size) {
    case "md":
      return "20px"
    case "sm":
      return "12px"
    default:
      return "20px"
  }
}

const getFontSize = (size: Size, theme: Theme) => {
  switch (size) {
    case "md":
      return theme.fontSizes.md
    case "sm":
      return 0
    default:
      return theme.fontSizes.md
  }
}
