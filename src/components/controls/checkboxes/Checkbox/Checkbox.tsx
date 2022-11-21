import styled from "@emotion/styled"
import { ChangeEvent, ComponentPropsWithoutRef, CSSProperties, forwardRef, useId } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { Box, BoxProps } from "../../../layout/Box/Box"

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  /** Props passed to the inner wrapper element. */
  innerWrapperProps?: BoxProps

  /** @deprecated since version 6.47.0. Use `innerWrapperProps` instead. */
  innerWrapperStyles?: CSSProperties

  /** Props passed to the label element. */
  labelProps?: ComponentPropsWithoutRef<"label">

  /** @deprecated since version 6.47.0. Use `labelProps` instead. */
  labelStyles?: CSSProperties

  /** Event handler called when the state of the checkbox changes. */
  onCheckedChange?: (checked: boolean) => void

  /** Props passed to the root element.. */
  wrapperProps?: BoxProps

  /** @deprecated since version 6.47.0. Use `wrapperProps` instead. */
  wrapperStyles?: CSSProperties
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      innerWrapperProps,
      innerWrapperStyles = {},
      labelProps,
      labelStyles = {},
      onCheckedChange,
      wrapperProps,
      wrapperStyles = {},
      ...props
    },
    ref,
  ) => {
    const id = useId()
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      onCheckedChange?.(e.target.checked)
      props.onChange?.(e)
    }
    return (
      <Box
        display="flex"
        alignItems="center"
        paddingBlock={1.5}
        paddingInline={2}
        style={wrapperStyles}
        {...wrapperProps}
      >
        <Box display="flex" position="relative" style={innerWrapperStyles} {...innerWrapperProps}>
          <StyledInput id={id} type="checkbox" {...props} onChange={handleChange} ref={ref} />
          <StyledIcon name="checkmark" />
        </Box>
        <StyledLabel htmlFor={id} style={labelStyles} {...labelProps}>
          {children}
        </StyledLabel>
      </Box>
    )
  },
)

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);

  &:focus-within {
    text-decoration: underline;
  }
`

const StyledInput = styled.input`
  appearance: none;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  margin-inline-end: ${({ theme }) => 2 * theme.spacer}px;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked:not(:disabled) {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background: ${({ theme }) => theme.colors.content.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  inset-inline-start: 6px;
  color: ${({ theme }) => theme.colors.background.primary};
  pointer-events: none;
`
