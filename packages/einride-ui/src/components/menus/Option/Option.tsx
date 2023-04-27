import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"

export interface OptionProps extends ComponentPropsWithoutRef<"div"> {
  /** Rendered element. */
  as?: ElementType

  /** Option content. */
  children: ReactNode

  /** Variant of the option. Default is `primary`. */
  variant?: Variant
}

export const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ children, variant = "primary", ...props }, forwardedRef) => {
    return (
      <Wrapper variant={variant} tabIndex={0} {...props} ref={forwardedRef}>
        {children}
      </Wrapper>
    )
  },
)

type Variant = "primary" | "secondary"

interface WrapperProps {
  variant: Variant
}

const Wrapper = styled.div<WrapperProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => 1 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};
  min-block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  column-gap: ${({ theme }) => 2 * theme.spacingBase}rem;
  inline-size: 100%;
  background: ${({ variant, theme }) =>
    variant === "secondary"
      ? theme.colors.background.secondaryElevated
      : theme.colors.background.primary};

  &:hover,
  &:focus-visible,
  &[data-focused="true"] {
    background: ${({ variant, theme }) =>
      variant === "secondary"
        ? theme.colors.background.tertiary
        : theme.colors.background.secondaryElevated};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`
