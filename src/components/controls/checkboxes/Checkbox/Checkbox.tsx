import styled from "@emotion/styled"
import * as React from "react"
import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import checkmark from "../../../../assets/icons/checkmark.svg"
import dash from "../../../../assets/icons/dash.svg"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
  children,
  labelStyles,
  ...props
}: CheckboxProps) => {
  return (
    <StyledLabel style={labelStyles}>
      <StyledInput {...props} />
      {children}
    </StyledLabel>
  )
}

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
    background-image: url(${checkmark});
    background-repeat: no-repeat;
    background-position: center;
  }

  &:indeterminate {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background-color: ${({ theme }) => theme.colors.content.primary};
    background-image: url(${dash});
    background-repeat: no-repeat;
    background-position: center;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`
