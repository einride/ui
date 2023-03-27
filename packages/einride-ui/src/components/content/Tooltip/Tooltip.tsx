import { css } from "@emotion/react"
import styled from "@emotion/styled"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { ReactNode } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { MaxWidth, Width } from "../../../lib/theme/props"
import { zIndex } from "../../../lib/zIndex"
import { Box } from "../../layout/Box/Box"

export interface TooltipProps {
  /* The preferred alignment against the trigger. May change when collisions occur. Default is `center`. */
  align?: "start" | "center" | "end"

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

  /** The duration from when the pointer enters the tooltip trigger until the tooltip opens. Default is `0`. */
  openDelayDuration?: number

  /** Merges the original component props with the props of the supplied component and change the underlying DOM node. */
  triggerAsChild?: boolean

  /** Width of the tooltip. */
  width?: Width
}

export const Tooltip = ({
  align = "center",
  children,
  content,
  disabled,
  hint,
  openDelayDuration = 0,
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
          <StyledTooltipContent align={align} collisionPadding={2 * theme.spacer} sideOffset={5}>
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

const StyledTooltipContent = styled(RadixTooltip.Content)`
  color: ${({ theme }) => theme.colors.content.primaryInverted};
  background: ${({ theme }) => theme.colors.background.primaryInverted};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding-block: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => theme.spacingBase}rem;
  z-index: ${zIndex.tooltip};
`
