import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { forwardRef } from "react"
import { getBorderRadius } from "../../../lib/theme/prop-system"
import { SpacingInput } from "../../../lib/theme/props"
import { Theme } from "../../../lib/theme/types"
import { Box, BoxProps } from "../../layout/Box/Box"

export interface SkeletonProps extends BoxProps {
  /** Whether or not to animate the skeleton. */
  animate?: boolean

  /** Height of the skeleton. Default is `md`. */
  height?: SpacingInput | "auto"

  /** Shape of the skeleton. Default is `rectangle`. */
  shape?: Shape

  /** Determines whether skeleton overlay should be displayed. */
  visible?: boolean
}

/** Indicate content loading state. Can be used to create a placeholder for loading content while minimizing layout shift caused by loading spinners. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { animate = true, height = "md", shape = "rectangle", visible = true, ...props },
    forwardedRef,
  ): React.JSX.Element => {
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

  ${({ borderRadius, shape, visible, theme }) =>
    visible &&
    css`
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${theme.colors.background.secondaryElevated};
        border-radius: ${borderRadius
          ? getBorderRadius(borderRadius, theme)
          : getBorderRadiusFromShape(shape, theme)};
      }
    `}

  @media (prefers-reduced-motion: no-preference) {
    ${({ animate, borderRadius, shape, visible, theme }) =>
      visible &&
      animate &&
      css`
        &::after {
          content: "";
          position: absolute;
          inset: 0;
          background: ${theme.colors.content.tertiary};
          border-radius: ${borderRadius
            ? getBorderRadius(borderRadius, theme)
            : getBorderRadiusFromShape(shape, theme)};
          animation: ${pulse} 1500ms linear infinite;
        }
      `}
  }
`

const getBorderRadiusFromShape = (shape: Shape, theme: Theme): string => {
  if (shape === "circle") {
    return theme.borderRadii.full
  }
  return theme.borderRadii.sm
}
