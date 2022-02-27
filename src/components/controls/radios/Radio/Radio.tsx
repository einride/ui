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
  width: 24px;
  height: 24px;
  margin: 12px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 24px;

  &:checked {
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
  }
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  align-items: center;
  margin: 12px 16px;
  color: ${({ theme }) => theme.colors.content.primary};

  &:focus-within {
    text-decoration: underline;
  }
`

const StyledRadio = styled(StyledInput)`
  margin: 0 16px 0 0;
`
