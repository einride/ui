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

export interface LabelTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: ReactNode
  message?: ReactNode
  placeholder?: string
  required?: boolean
  /** Default: "neutral" */
  status?: Status
  value: string
}

export const LabelTextInput = forwardRef<HTMLInputElement, LabelTextInputProps>(
  ({ label, message, required, status, ...props }, ref) => {
    const theme = useTheme()

    return (
      <StyledLabel>
        {label} {required && " (required)"}
        <BaseInput icon={getStatusIcon(theme, status)} {...props} ref={ref} />
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </StyledLabel>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 5px 0 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
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
