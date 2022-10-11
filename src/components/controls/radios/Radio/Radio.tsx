import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  children: ReactNode
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, labelStyles = {}, ...props }, ref) => {
    return (
      <StyledLabel style={labelStyles}>
        <StyledRadio type="radio" {...props} ref={ref} />
        {children}
      </StyledLabel>
    )
  },
)

const StyledInput = styled.input`
  appearance: none;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  margin: ${({ theme }) => 1.5 * theme.spacer}px;
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
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  align-items: center;
  margin-block: ${({ theme }) => 1.5 * theme.spacer}px;
  margin-inline: ${({ theme }) => 2 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};

  &:focus-within {
    text-decoration: underline;
  }
`

const StyledRadio = styled(StyledInput)`
  margin-inline-end: ${({ theme }) => 2 * theme.spacer}px;
`
