import { css } from "@emotion/react"
import styled from "@emotion/styled"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { ReactNode } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { zIndex } from "../../../lib/zIndex"

interface TooltipProps {
  /** Tooltip components. */
  children: ReactNode

  /** The content of the tooltip. */
  content: ReactNode

  /** Disables tooltip from showing. */
  disabled?: boolean

  /** Determines whether or not to show a dashed underline on children as a tooltip hint. */
  hint?: boolean

  /** Merges the original component props with the props of the supplied component and change the underlying DOM node. */
  triggerAsChild?: boolean
}

export const Tooltip = ({
  children,
  content,
  disabled,
  hint,
  triggerAsChild,
  ...props
}: TooltipProps): JSX.Element => {
  const theme = useTheme()
  if (disabled) return <>{children}</>
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <StyledTooltipTrigger hint={hint} asChild={Boolean(triggerAsChild)}>
          {children}
        </StyledTooltipTrigger>
        <RadixTooltip.Portal>
          <StyledTooltipContent collisionPadding={2 * theme.spacer} sideOffset={5} {...props}>
            {content}
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
