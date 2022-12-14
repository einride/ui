import { css } from "@emotion/react"
import styled from "@emotion/styled"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { ReactNode } from "react"

interface TooltipProps {
  /** Tooltip components. */
  children: ReactNode

  /** The content of the tooltip. */
  content: ReactNode

  /** Determines whether or not to show a dashed underline on children as a tooltip hint. */
  hint?: boolean

  /** Merges the original component props with the props of the supplied component and change the underlying DOM node. */
  triggerAsChild?: boolean
}

export const Tooltip = ({
  children,
  content,
  hint,
  triggerAsChild,
  ...props
}: TooltipProps): JSX.Element => {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <StyledTooltipTrigger hint={hint} asChild={Boolean(triggerAsChild)}>
          {children}
        </StyledTooltipTrigger>
        <StyledTooltipContent sideOffset={5} {...props}>
          {content}
        </StyledTooltipContent>
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
      text-decoration-thickness: 1px;
      text-underline-position: under;
    `}

  &:focus-visible {
    outline: none;
    text-decoration-style: solid;
  }
`

const StyledTooltipContent = styled(RadixTooltip.Content)`
  color: ${({ theme }) => theme.colors.content.primaryInverted};
  background: ${({ theme }) => theme.colors.background.primaryInverted};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding-block: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => theme.spacingBase}rem;
`
