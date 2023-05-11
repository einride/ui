import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode, forwardRef, useId } from "react"

export interface RadioProps extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  /** Radio label. */
  children?: ReactNode

  /** Disables the radio. */
  disabled?: boolean

  /** Props passed to the label element. */
  labelProps?: HTMLAttributes<HTMLLabelElement>

  /** Event handler called when the state of the radio changes. */
  onCheckedChange?: (checked: boolean) => void

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

/** Radio button. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, labelProps, onCheckedChange, wrapperProps, ...props }, ref) => {
    const id = useId()
    return (
      <Wrapper {...wrapperProps}>
        <StyledInput
          type="radio"
          id={id}
          {...props}
          onChange={(value) => onCheckedChange?.(value.target.checked)}
          ref={ref}
        />
        {children && (
          <StyledLabel htmlFor={id} {...labelProps}>
            {children}
          </StyledLabel>
        )}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  padding: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => 2 * theme.spacingBase}rem;

  &:has(label) {
    padding-inline: ${({ theme }) =>
      2 * theme.spacingBase}rem; // increase inline padding when label is present
  }

  &:has(input:focus-visible) label {
    text-decoration: underline;
  }

  &:has(input:disabled) label {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const StyledInput = styled.input`
  appearance: none;
  flex-shrink: 0; // ensure consistent radio button shape dispite long label content
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => 0.25 * theme.spacingBase}rem solid
    ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};

  &:checked:not(:disabled) {
    border-width: ${({ theme }) => theme.spacingBase}rem;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: calc(4 / 3);
  color: ${({ theme }) => theme.colors.content.primary};
`
