import { Theme, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  ReactNode,
  TextareaHTMLAttributes,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  as?: ElementType
  label: ReactNode
  labelStyles?: CSSProperties
  message?: ReactNode
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  status?: Status
  value: string
  wrapperStyles?: CSSProperties
}

export const Textarea = ({
  label,
  labelStyles = {},
  message,
  status,
  wrapperStyles = {},
  ...props
}: TextareaProps) => {
  const theme = useTheme()

  return (
    <StyledLabel style={labelStyles}>
      {label}
      <Wrapper style={wrapperStyles}>
        <StyledTextarea {...props} />
        <IconWrapper>{getStatusIcon(theme, status)}</IconWrapper>
      </Wrapper>
      {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
    </StyledLabel>
  )
}

type Status = "success" | "fail" | "neutral"

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.secondary};
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`

const Wrapper = styled.div`
  position: relative;
`

const StyledTextarea = styled.textarea`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: block;
  min-width: 100%;
  resize: none;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;
  flex-grow: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }
`

const IconWrapper = styled.span`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => 2 * theme.spacer}px;
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
