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

export interface LabelTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: ReactNode
  message?: ReactNode
  placeholder: string
  required?: boolean
  status?: Status
  value: string
}

export const LabelTextInput = ({
  label,
  message,
  required,
  status,
  ...props
}: LabelTextInputProps) => {
  return (
    <StyledLabel>
      {label} {required && " (required)"}
      <Wrapper status={status}>
        <BaseInput icon={getStatusIcon(status)} {...props} />
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </Wrapper>
    </StyledLabel>
  )
}

type Status = "success" | "fail" | "neutral"

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 5px 0 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const Wrapper = styled.div<{ status: Status | undefined }>`
  color: ${({ theme, status }) => getColor(theme, status)};
`

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
