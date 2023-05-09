import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useId } from "react"
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
}

interface TextareaWithLabelProps {
  /** Textarea label, displayed before textarea. */
  label: ReactNode

  /** Props passed to label elemenet. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface TextareaWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type TextareaProps = TextareaBaseProps & (TextareaWithLabelProps | TextareaWithoutLabelProps)

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ message, status, wrapperProps, ...props }, ref) => {
    const id = useId()
    const messageId = useId()
    return (
      <Box {...wrapperProps}>
        {"label" in props && (
          <StyledLabel {...props.labelProps} htmlFor={id}>
            {props.label}
          </StyledLabel>
        )}
        <Box position="relative">
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
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
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
    opacity: 1; // To overwrite the default opacity some browsers (e.g. Firefox) set on placeholders
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const getStatusIcon = (status?: Status): React.JSX.Element | null => {
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
