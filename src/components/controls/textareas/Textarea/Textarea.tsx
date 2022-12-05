import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, CSSProperties, forwardRef, ReactNode, useId } from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"

interface TextareaBaseProps extends ComponentPropsWithoutRef<"textarea"> {
  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /**  Default is `neutral`. */
  status?: Status

  /** Props passed to root elemenet. */
  wrapperProps?: BoxProps

  /** Styles passed to root element.
   *  @deprecated since version 6.34.0. Use `wrapperProps` instead. */
  // TODO: Remove in next major.
  wrapperStyles?: CSSProperties
}

interface TextareaWithLabelProps {
  /** Textarea label, displayed before textarea. */
  label: ReactNode

  /** Props passed to label elemenet. */
  labelProps?: ComponentPropsWithoutRef<"label">

  /** Styles passed to the label element.
   *  @deprecated since version 6.34.0. Use `labelProps` instead. */
  // TODO: Remove in next major.
  labelStyles?: CSSProperties
}

interface TextareaWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type TextareaProps = TextareaBaseProps & (TextareaWithLabelProps | TextareaWithoutLabelProps)

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ message, status, wrapperProps, wrapperStyles = {}, ...props }, ref) => {
    const id = useId()
    const messageId = useId()
    return (
      <Box {...wrapperProps}>
        {"label" in props && (
          <StyledLabel {...props.labelProps} htmlFor={id} style={props.labelStyles}>
            {props.label}
          </StyledLabel>
        )}
        <Box position="relative" style={wrapperStyles}>
          <StyledTextarea
            {...props}
            aria-errormessage={status === "fail" && message ? messageId : undefined}
            aria-describedby={status !== "fail" && message ? messageId : undefined}
            aria-invalid={status === "fail"}
            hasLabel={"label" in props}
            id={id}
            ref={ref}
          />
          {(status === "fail" || status === "success") && (
            <Box
              alignItems="center"
              blockSize={3}
              display="flex"
              inlineSize={3}
              insetBlockStart={1.5}
              insetInlineEnd={2}
              justifyContent="center"
              pointerEvents="none"
              position="absolute"
            >
              {getStatusIcon(status)}
            </Box>
          )}
        </Box>
        {message && (
          <Caption color={getMessageColor(status)} id={messageId}>
            {message}
          </Caption>
        )}
      </Box>
    )
  },
)

const StyledLabel = styled.label`
  display: inline-block;
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

interface StyledTextareaProps {
  hasLabel: boolean
}

const StyledTextarea = styled.textarea<StyledTextareaProps>`
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
      return <Icon color="positive" name="checkmark" />
    case "fail":
      return <Icon color="negative" name="warning" />
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

type Status = "success" | "fail" | "neutral"
