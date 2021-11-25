import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react"
import { DefaultDropdownSelect } from "../DefaultDropdownSelect"

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.content.secondary};
  margin-top: 5px;

  &:focus-within {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`

export interface LabelDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  isFullWidth?: boolean
  label: ReactNode
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
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

const StyledDefaultDropdown = styled(DefaultDropdownSelect)`
  margin-top: 3px;
`
