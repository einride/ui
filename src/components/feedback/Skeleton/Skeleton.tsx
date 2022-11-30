import styled from "@emotion/styled"
import { forwardRef } from "react"
import { SpacingInput } from "../../../lib/theme/props"
import { Box, BoxProps } from "../../layout/Box/Box"

interface SkeletonProps extends BoxProps {
  /** Height of the skeleton. Default is `md`. */
  height?: SpacingInput

  /** Shape of the skeleton. Default is `rectangle`. */
  shape?: Shape
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ height = "md", shape = "rectangle", ...props }, forwardedRef): JSX.Element => {
    return (
      <Wrapper
        height={height}
        inlineSize={shape === "circle" ? height : "100%"}
        shape={shape}
        {...props}
        ref={forwardedRef}
      />
    )
  },
)

type Shape = "rectangle" | "circle"

interface WrapperProps {
  shape: Shape
}

const Wrapper = styled(Box)<WrapperProps>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ shape, theme }) =>
    shape === "circle" ? theme.borderRadii.full : theme.borderRadii.sm};
`
