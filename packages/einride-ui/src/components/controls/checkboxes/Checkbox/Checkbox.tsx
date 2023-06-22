import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, useId } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { Box, BoxProps } from "../../../layout/Box/Box"

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  /** Disables the checkbox. */
  disabled?: boolean

  /** Sets the checkbox to an indeterminate state in which case the `checked` state is ignored visually. */
  indeterminate?: boolean

  /** Props passed to the inner wrapper element. */
  innerWrapperProps?: BoxProps

  /** Props passed to the label element. */
  labelProps?: ComponentPropsWithoutRef<"label">

  /** Event handler called when the state of the checkbox changes. */
  onCheckedChange?: (checked: boolean) => void

  /** Props passed to the root element.. */
  wrapperProps?: BoxProps
}

/** Checkbox control. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      indeterminate,
      innerWrapperProps,
      labelProps,
      onCheckedChange,
      wrapperProps,
      ...props
    },
    ref,
  ) => {
    const id = useId()
    return (
      <Wrapper
        display="flex"
        alignItems="center"
        paddingBlock={1.5}
        paddingInline={2}
        {...wrapperProps}
      >
        <InnerWrapper display="flex" position="relative" {...innerWrapperProps}>
          <StyledInput
            id={id}
            data-indeterminate={indeterminate}
            type="checkbox"
            {...props}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            ref={ref}
          />
          {indeterminate ? (
            <MinusSpan>—</MinusSpan>
          ) : (
            <StyledIcon color="primaryInverted" name="checkmark" />
          )}
        </InnerWrapper>
        {children ? (
          <StyledLabel htmlFor={id} {...labelProps}>
            {children}
          </StyledLabel>
        ) : null}
      </Wrapper>
    )
  },
)

const Wrapper = styled(Box)`
  &:has(input[type="checkbox"]:focus-visible) label {
    text-decoration: underline;
  }
`

const InnerWrapper = styled(Box)`
  &:has(input[type="checkbox"]:disabled) span {
    color: transparent;
  }
`

const StyledLabel = styled.label`
  line-height: calc(4 / 3);
  padding-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
`

const StyledInput = styled.input`
  appearance: none;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  border: ${({ theme }) => 0.25 * theme.spacingBase}rem solid
    ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked:not(:disabled),
  &[data-indeterminate="true"]:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
    background: ${({ theme }) => theme.colors.content.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  inset-inline-start: ${({ theme }) => 0.625 * theme.spacingBase}rem;
  pointer-events: none;
`

const MinusSpan = styled.span`
  position: absolute;
  inset-inline-start: ${({ theme }) => 0.625 * theme.spacingBase}rem;
  inset-block-start: ${({ theme }) => 1.25 * theme.spacingBase}rem;
  color: ${({ theme }) => theme.colors.background.primary};
  pointer-events: none;
  line-height: 0.125;
`
