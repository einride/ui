import { useTheme } from "@emotion/react"
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
  const theme = useTheme()

  return (
    <>
      <BaseInput icon={getStatusIcon(theme, status)} {...props} />
      {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
    </>
  )
}

type Status = "success" | "fail" | "neutral"

const getStatusIcon = (theme: Theme, status?: Status) => {
  switch (status) {
    case "success":
      return (
        <Icon
          name="checkmark"
          style={{ color: theme.colors.content.positive }}
        />
      )
    case "fail":
      return (
        <Icon name="warning" style={{ color: theme.colors.content.negative }} />
      )
    default:
      return null
  }
}

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
