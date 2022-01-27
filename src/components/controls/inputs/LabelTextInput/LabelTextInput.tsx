import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../../lib/theme/theme"
import { BaseInput } from "../BaseInput/BaseInput"

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
  statusMessage,
  ...props
}: LabelTextInputProps) => {
  return (
    <StyledLabel status={status}>
      {label} {required && " (required)"}
      <Wrapper status={status}>
        <StyledBaseInput
          icon={getStatusIcon(status)}
          status={status}
          {...props}
        />
        {status && <StyledMessage>{statusMessage}</StyledMessage>}
      </Wrapper>
    </StyledLabel>
  )
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

const Wrapper = styled.div<{ status?: Status }>`
  color: ${({ theme, status }) => getColor(theme, status)};
`

const StyledBaseInput = styled(BaseInput)<{ status?: Status }>`
  background: ${({ theme, status }) => getBackgroundColor(theme, status)};
  &:hover:not(:disabled) {
    background: ${({ theme, status }) => getBackgroundColor(theme, status)};
  }
`

const StyledMessage = styled.div`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin: 3px 0 5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

type Status = "success" | "fail"

const getBackgroundColor = (theme: Theme, status?: Status) => {
  switch (status) {
    case "success":
      return theme.colors.background.positive
    case "fail":
      return theme.colors.background.negative
    default:
      return theme.colors.background.secondary
  }
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

const getStatusIcon = (status?: Status) => {
  switch (status) {
    case "success":
      return "✓"
    case "fail":
      return "􀇿︎"
    default:
      return ""
  }
}
