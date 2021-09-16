import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, CSSProperties, InputHTMLAttributes } from "react"
import { DefaultCheckbox } from "../DefaultCheckbox"

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

const StyledDefaultCheckbox = styled(DefaultCheckbox)`
  margin: 0 16px 0 0;
`

export interface LabelCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelStyles: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LabelCheckbox = ({
  label,
  labelStyles,
  ...props
}: LabelCheckboxProps) => {
  return (
    <StyledLabel style={labelStyles}>
      <StyledDefaultCheckbox {...props} />
      {label}
    </StyledLabel>
  )
}
