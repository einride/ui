import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: ReactNode
  labelStyles?: CSSProperties
  message?: ReactNode
  placeholder?: string
  required?: boolean
  /** Default: "neutral" */
  status?: Status
  value?: string
  wrapperStyles?: CSSProperties
}

export const LabelTextInput = forwardRef<HTMLInputElement, LabelTextInputProps>(
  (
    {
      label,
      labelStyles = {},
      message,
      required,
      status,
      wrapperStyles,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()

    return (
      <Wrapper style={wrapperStyles}>
        <StyledLabel htmlFor="einride-ui-label-text-input" style={labelStyles}>
          {label} {required && " (required)"}
        </StyledLabel>
        <BaseInput
          id="einride-ui-label-text-input"
          icon={getStatusIcon(theme, status)}
          {...props}
          ref={ref}
        />
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </Wrapper>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-top: 5px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const getStatusIcon = (theme: Theme, status?: Status): JSX.Element | null => {
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
