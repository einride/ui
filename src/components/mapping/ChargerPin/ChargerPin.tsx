import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { primitives } from "../../../primitives/primitives"
import { Icon } from "../../content/Icon/Icon"

export interface ChargerPinProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Default: "md" */
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
  inline-size: ${({ size }) => getSize(size)};
  block-size: ${({ size }) => getSize(size)};
  background: ${primitives.color.green.default};
  color: ${primitives.color.greyscale.white};
  border: 2px solid ${primitives.color.greyscale.white};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  font-size: ${({ size, theme }) => getFontSize(size, theme)};
`

const getSize = (size: Size): string => {
  switch (size) {
    case "md":
      return "20px"
    case "sm":
      return "12px"
    default:
      return "20px"
  }
}

const getFontSize = (size: Size, theme: Theme): string | number => {
  switch (size) {
    case "md":
      return theme.fontSizes.md
    case "sm":
      return 0
    default:
      return theme.fontSizes.md
  }
}
