import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../../lib/theme/theme"
import { TextInput } from "../TextInput/TextInput"

export interface LabelTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: ReactNode
  placeholder: string
  required?: boolean
  status?: Status
  statusMessage?: ReactNode
  value: string
}

export const LabelTextInput = ({
  label,
  required,
  status,
  ...props
}: LabelTextInputProps) => {
  return (
    <StyledLabel status={status}>
      {label} {required && " (required)"}
      <TextInput status={status} {...props} />
    </StyledLabel>
  )
}

const getColor = (theme: Theme, status?: Status) => {
  switch (status) {
    case "success":
      return theme.colors.content.positive
    case "fail":
      return theme.colors.content.negative
    default:
      return theme.colors.content.secondary
  }
}

const StyledLabel = styled.label<{ status?: Status }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 5px 0 3px;
  color: ${({ theme, status }) => getColor(theme, status)};

  &:focus-within {
    color: ${({ theme, status }) => getColor(theme, status)};
  }
`

type Status = "success" | "fail"
