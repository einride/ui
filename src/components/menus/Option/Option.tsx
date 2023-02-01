import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { Icon } from "../../content/Icon/Icon"

interface OptionProps extends ComponentPropsWithoutRef<"div"> {
  /** Effective element used. */
  as?: ElementType

  /** Option content. */
  children: ReactNode

  /** Icon shown at the end of the option row. */
  icon?: ReactNode

  /** Whether the option is selected or not. */
  selected?: boolean

  /** Whether the option is focused (e.g. via arrow keys) or not. */
  focused?: boolean

  /** Variant of the option. Default is `primary`. */
  variant?: Variant
}

export const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ children, icon, selected, focused, variant = "primary", ...props }, forwardedRef) => {
    return (
      <Wrapper
        aria-selected={selected}
        data-focused={focused}
        variant={variant}
        tabIndex={0}
        {...props}
        ref={forwardedRef}
      >
        {children}
        {selected ? <Icon name="checkmark" /> : icon}
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
  padding-block: ${({ theme }) => 1.25 * theme.spacer}px;
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

  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }

  &:hover,
  &[data-focused="true"] {
    background: ${({ variant, theme }) =>
      variant === "secondary"
        ? theme.colors.background.tertiary
        : theme.colors.background.secondaryElevated};
    box-shadow: none;
  }
`
