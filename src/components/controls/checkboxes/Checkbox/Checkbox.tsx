import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { Icon } from "../../../content/Icon/Icon"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  children: ReactNode
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, labelStyles, ...props }, ref) => {
    return (
      <Wrapper>
        <StyledLabel style={labelStyles}>
          <StyledInput type="checkbox" {...props} ref={ref} />
          {children}
        </StyledLabel>
        <StyledIcon name="checkmark" />
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  position: relative;
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 12px 16px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.content.primary};

  &:focus-within {
    text-decoration: underline;
  }
`

const StyledInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  margin-right: ${({ theme }) => 2 * theme.spacer}px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background-color: ${({ theme }) => theme.colors.content.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 2px;
  left: 22px;
  color: ${({ theme }) => theme.colors.background.primary};
  pointer-events: none;
`
