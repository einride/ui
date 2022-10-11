import styled from "@emotion/styled"
import {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"

export interface TextareaBaseProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Effective element used. */
  as?: ElementType

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /**  Default is `neutral`. */
  status?: Status

  /** Styles passed to root element. */
  // TODO: Replace with `wrapperProps` in next major
  wrapperStyles?: CSSProperties
}

interface TextareaWithLabelProps {
  /** Textarea label, displayed before textarea. */
  label: ReactNode

  /** Styles passed to the label element. */
  // TODO: Replace with `labelProps` in next major
  labelStyles?: CSSProperties
}

interface TextareaWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type TextareaProps = TextareaBaseProps & (TextareaWithLabelProps | TextareaWithoutLabelProps)

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ message, status, wrapperStyles = {}, ...props }, ref) => {
    const id = useId()
    const messageId = useId()

    return (
      <Wrapper>
        {"label" in props && (
          <StyledLabel htmlFor={id} style={props.labelStyles}>
            {props.label}
          </StyledLabel>
        )}
        <InputWrapper style={wrapperStyles}>
          <StyledTextarea
            {...props}
            {...(status === "fail" && { "aria-errormessage": messageId, "aria-invalid": "true" })}
            hasLabel={"label" in props}
            id={id}
            ref={ref}
          />
          <IconWrapper>{getStatusIcon(status)}</IconWrapper>
        </InputWrapper>
        {message && (
          <Caption color={getMessageColor(status)} id={messageId}>
            {message}
          </Caption>
        )}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div``

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.span`
  position: absolute;
  inset-block-start: ${({ theme }) => 1.5 * theme.spacer}px;
  inset-inline-end: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledTextarea = styled.textarea<{ hasLabel: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  resize: none;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const getStatusIcon = (status?: Status): JSX.Element | null => {
  switch (status) {
    case "success":
      return <PositiveIcon name="checkmark" />
    case "fail":
      return <NegativeIcon name="warning" />
    default:
      return null
  }
}

const PositiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.content.positive};
`

const NegativeIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.content.negative};
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

type Status = "success" | "fail" | "neutral"
