import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { ReactNode } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { MaxWidth, Width } from "../../../lib/theme/props"
import { zIndex } from "../../../lib/zIndex"
import { Box } from "../../layout/Box/Box"

interface TooltipProps {
  /** Tooltip components. */
  children: ReactNode

  /** The content of the tooltip. */
  content: ReactNode

  /** Disables tooltip from showing. */
  disabled?: boolean

  /** Determines whether or not to show a dashed underline on children as a tooltip hint. */
  hint?: boolean

  /** Max width of the tooltip. */
  maxWidth?: MaxWidth

  /** The duration from when the mouse enters a tooltip trigger until the tooltip opens. Default is `0`. */
  openDelayDuration?: number

  /** The duration from when the mouse leaves a tooltip trigger until the tooltip closes. Default is `0`. */
  closeDelayDuration?: number

  /** Merges the original component props with the props of the supplied component and change the underlying DOM node. */
  triggerAsChild?: boolean

  /** Width of the tooltip. */
  width?: Width
}

export const Tooltip = ({
  children,
  content,
  disabled,
  hint,
  openDelayDuration = 0,
  closeDelayDuration = 0,
  triggerAsChild,
  ...props
}: TooltipProps): JSX.Element => {
  const theme = useTheme()
  if (disabled) return <>{children}</>
  return (
    <RadixTooltip.Provider delayDuration={openDelayDuration}>
      <RadixTooltip.Root>
        <StyledTooltipTrigger hint={hint} asChild={Boolean(triggerAsChild)}>
          {children}
        </StyledTooltipTrigger>
        <RadixTooltip.Portal>
          <StyledTooltipContent
            collisionPadding={2 * theme.spacer}
            sideOffset={5}
            closeDelayDuration={closeDelayDuration}
          >
            <Box {...props}>{content}</Box>
          </StyledTooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

interface StyledTooltipTriggerProps {
  hint: boolean | undefined
}

const StyledTooltipTrigger = styled(RadixTooltip.Trigger, {
  shouldForwardProp: (prop) => prop !== "hint",
})<StyledTooltipTriggerProps>`
  ${({ hint, theme }) =>
    hint &&
    css`
      text-decoration-line: underline;
      text-decoration-color: ${theme.colors.content.tertiary};
      text-decoration-style: dashed;
      text-decoration-thickness: ${theme.spacingBase / 8}rem;
      text-underline-position: under;

      &:hover {
        text-decoration-style: solid;
      }
    `}

  &:focus-visible {
    outline: ${({ theme }) => theme.spacingBase / 8}rem solid currentColor;
  }
`

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const StyledTooltipContent = styled(RadixTooltip.Content, {
  shouldForwardProp: (prop) => prop !== "closeDelayDuration",
})<{ closeDelayDuration: boolean }>`
  color: ${({ theme }) => theme.colors.content.primaryInverted};
  background: ${({ theme }) => theme.colors.background.primaryInverted};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding-block: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => theme.spacingBase}rem;
  z-index: ${zIndex.tooltip};
  ${({ theme }) =>
    css`
      animation: ${fadeIn} ${theme.transitions.morph.duration} ease-in;
    `};

  &[data-state="closed"] {
    ${({ theme, closeDelayDuration }) =>
      css`
        animation: ${fadeOut} ${theme.transitions.morph.duration} ${closeDelayDuration}ms ease-in;
      `};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
