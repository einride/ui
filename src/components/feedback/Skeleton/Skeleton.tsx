import styled from "@emotion/styled"
import { HTMLAttributes } from "react"
import { Theme } from "../../../lib/theme/types"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  height?: Height
  shape?: Shape
}

export const Skeleton = ({
  height = "md",
  shape = "rectangle",
  ...props
}: SkeletonProps): JSX.Element => {
  return <Wrapper height={height} shape={shape} {...props} />
}

type Height = "xs" | "sm" | "md" | "lg" | "xl"

type Shape = "rectangle" | "circle"

interface WrapperProps {
  height: Height
  shape: Shape
}

const Wrapper = styled.div<WrapperProps>`
  height: ${({ height, theme }) => getHeight(height, theme)}px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ shape, theme }) =>
    shape === "circle" ? theme.borderRadii.full : theme.borderRadii.sm};
  ${({ height, shape, theme }) => shape === "circle" && `width: ${getHeight(height, theme)}px`};
`

const getHeight = (height: Height, theme: Theme): number => {
  switch (height) {
    case "xs":
      return theme.spacer
    case "sm":
      return 2 * theme.spacer
    case "md":
      return 3 * theme.spacer
    case "lg":
      return 6 * theme.spacer
    case "xl":
      return 8 * theme.spacer
    default:
      return 2 * theme.spacer
  }
}
