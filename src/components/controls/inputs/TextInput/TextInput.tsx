import styled from "@emotion/styled"
import {
  ChangeEvent,
  ElementType,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { useTheme } from "../../../../hooks/useTheme"
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
  /** Default: "neutral" */
  status?: Status
  value: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ message, status, ...props }, ref) => {
    const theme = useTheme()

    return (
      <>
        <StyledBaseInput
          icon={getStatusIcon(theme, status)}
          {...props}
          ref={ref}
        />
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const StyledBaseInput = styled(BaseInput)`
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`

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
