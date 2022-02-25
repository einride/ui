import styled from "@emotion/styled"
import {
  ChangeEvent,
  ElementType,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { Theme } from "../../../../lib/theme/theme"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"
import { BaseInput } from "../BaseInput/BaseInput"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  "aria-label": string
  as?: ElementType
  message?: ReactNode
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  status?: Status
  value: string
}

export const TextInput = ({ message, status, ...props }: TextInputProps) => {
  return (
    <Wrapper status={status}>
      <BaseInput icon={getStatusIcon(status)} {...props} />
      {status && <Caption color={getMessageColor(status)}>{message}</Caption>}
    </Wrapper>
  )
}

type Status = "success" | "fail" | "neutral"

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
      return <Icon name="checkmark" />
    case "fail":
      return <Icon name="warning" />
    default:
      return null
  }
}

const Wrapper = styled.div<{ status: Status | undefined }>`
  color: ${({ theme, status }) => getColor(theme, status)};
`

const getMessageColor = (status: Status | undefined): ContentColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    default:
      return "secondary"
  }
}
