import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../../theme"
import { BaseInput } from "../BaseInput"

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
      return "⚠︎"
    default:
      return ""
  }
}

const Wrapper = styled.div<{ status?: Status }>`
  color: ${({ theme, status }) => getColor(theme, status)};
`

const StyledBaseInput = styled(BaseInput)<{ status?: Status }>`
  background-color: ${({ theme, status }) => getBackgroundColor(theme, status)};
`

const StyledMessage = styled.div`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin: 3px 0 5px;
  font-size: 14px;
`

type Status = "success" | "fail"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  status?: Status
  statusMessage?: ReactNode
  value: string
}

export const TextInput = ({
  status,
  statusMessage,
  ...props
}: TextInputProps) => {
  return (
    <Wrapper status={status}>
      <StyledBaseInput
        icon={getStatusIcon(status)}
        status={status}
        {...props}
      />
      {status && <StyledMessage>{statusMessage}</StyledMessage>}
    </Wrapper>
  )
}
