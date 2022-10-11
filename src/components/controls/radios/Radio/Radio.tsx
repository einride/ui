import styled from "@emotion/styled"
import {
  CSSProperties,
  ElementType,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react"

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Effective element used. */
  as?: ElementType

  /** Radio label. */
  children: ReactNode

  /** Props passed to the label element. */
  labelProps?: HTMLAttributes<HTMLLabelElement>

  /** @deprecated Since version 6.16.5. Use `labelProps` instead. */
  labelStyles?: CSSProperties

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, labelProps, labelStyles = {}, wrapperProps, ...props }, ref) => {
    const id = useId()

    return (
      <Wrapper {...wrapperProps}>
        <StyledInput type="radio" id={id} {...props} ref={ref} />
        <StyledLabel htmlFor={id} style={labelStyles} {...labelProps}>
          {children}
        </StyledLabel>
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => 2 * theme.spacer}px;

  &:has(input:focus-visible) label {
    text-decoration: underline;
  }

  &:has(input:disabled) label {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const StyledInput = styled.input`
  appearance: none;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};

  &:checked:not(:disabled) {
    border-width: 8px;
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
  color: ${({ theme }) => theme.colors.content.primary};
`
