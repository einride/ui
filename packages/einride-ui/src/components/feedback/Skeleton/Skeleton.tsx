import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { forwardRef } from "react"
import { SpacingInput } from "@einride/core"
import { Box, BoxProps } from "../../layout/Box/Box"

interface SkeletonProps extends BoxProps {
  /** Whether or not to animate the skeleton. */
  animate?: boolean

  /** Height of the skeleton. Default is `md`. */
  height?: SpacingInput | "auto"

  /** Shape of the skeleton. Default is `rectangle`. */
  shape?: Shape

  /** Determines whether skeleton overlay should be displayed. */
  visible?: boolean
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { animate = true, height = "md", shape = "rectangle", visible = true, ...props },
    forwardedRef,
  ): JSX.Element => {
    return (
      <Wrapper
        animate={animate}
        height={height}
        inlineSize={shape === "circle" ? height : "100%"}
        shape={shape}
        visible={visible}
        {...props}
        ref={forwardedRef}
      />
    )
  },
)

type Shape = "rectangle" | "circle"

const pulse = keyframes`
  from, to {
    opacity: 0.1;
  }

  50% {
    opacity: 0.3;
  }
`

interface WrapperProps {
  animate?: boolean
  shape: Shape
  visible?: boolean
}

const Wrapper = styled(Box)<WrapperProps>`
  position: relative;

  ${({ shape, visible, theme }) =>
    visible &&
    css`
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${theme.colors.background.secondaryElevated};
        border-radius: ${shape === "circle" ? theme.borderRadii.full : theme.borderRadii.sm};
      }
    `}

  @media (prefers-reduced-motion: no-preference) {
    ${({ animate, shape, visible, theme }) =>
      visible &&
      animate &&
      css`
        &::after {
          content: "";
          position: absolute;
          inset: 0;
          background: ${theme.colors.content.tertiary};
          border-radius: ${shape === "circle" ? theme.borderRadii.full : theme.borderRadii.sm};
          animation: ${pulse} 1500ms linear infinite;
        }
      `}
  }
`
