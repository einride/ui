import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react"
import { DefaultDropdownSelect } from "../DefaultDropdownSelect"

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.secondary};
  margin-top: 5px;

  &:focus-within {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`

const StyledDefaultDropdown = styled(DefaultDropdownSelect)`
  margin-top: 3px;
`

interface Option {
  text?: string
  value: string
}

export interface LabelDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean
  label: ReactNode
  options: Option[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const LabelDropdownSelect = ({
  label,
  ...props
}: LabelDropdownSelectProps) => {
  return (
    <StyledLabel>
      {label}
      <StyledDefaultDropdown {...props} />
    </StyledLabel>
  )
}
