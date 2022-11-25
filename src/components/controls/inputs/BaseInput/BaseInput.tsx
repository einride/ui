import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode, useId } from "react"
import { getBackground } from "../../../../lib/theme/prop-system"
import { BackgroundColor, ContentColor, Theme } from "../../../../lib/theme/types"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"

export interface BaseInputProps extends ComponentPropsWithoutRef<"input"> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the input field. Default is `secondary`. */
  background?: BackgroundColor

  /** Input label, displayed before input. */
  label?: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }

  /** Icon shown on the left side. */
  leftIcon?: ReactNode

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: Omit<ComponentPropsWithoutRef<"span"> & { "data-testid"?: string }, "color">

  /** Icon shown on the right side. */
  rightIcon?: ReactNode

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, labelProps, leftIcon, message, rightIcon, status, wrapperProps, ...props }, ref) => {
    const id = useId()
    const messageId = useId()

    return (
      <Box {...wrapperProps}>
        {label && (
          <StyledLabel {...labelProps} htmlFor={id}>
            {label}
          </StyledLabel>
        )}
        <InputWrapper>
          {leftIcon && <LeftIconWrapper>{leftIcon}</LeftIconWrapper>}
          <StyledInput
            {...props}
            aria-errormessage={status === "fail" && message ? messageId : undefined}
            aria-describedby={status !== "fail" && message ? messageId : undefined}
            aria-invalid={status === "fail"}
            hasLabel={!!label}
            leftIcon={!!leftIcon}
            rightIcon={!!rightIcon}
            id={id}
            ref={ref}
          />
          {rightIcon && <RightIconWrapper>{rightIcon}</RightIconWrapper>}
        </InputWrapper>
        {message && (
          <Caption color={getMessageColor(status)} {...props.messageProps} id={messageId}>
            {message}
          </Caption>
        )}
      </Box>
    )
  },
)

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

const IconWrapper = styled.div`
  position: absolute;
  inset-block: ${({ theme }) => 1.5 * theme.spacer}px;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftIconWrapper = styled(IconWrapper)`
  inset-inline-start: ${({ theme }) => theme.spacer}px;
`

const RightIconWrapper = styled(IconWrapper)`
  inset-inline-end: ${({ theme }) => theme.spacer}px;
`

interface StyledInputProps {
  background?: BackgroundColor
  hasLabel: boolean
  leftIcon: boolean
  rightIcon: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ background, theme }) =>
    background ? getBackground(background, theme) : theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  ${({ leftIcon, theme }) => leftIcon && `padding-inline-start: ${4.5 * theme.spacer}px`};
  ${({ rightIcon, theme }) => rightIcon && `padding-inline-end: ${6 * theme.spacer}px`};

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ background, theme }) =>
      background ? getHoverBackground(background, theme) : theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }
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

export type Status = "success" | "fail" | "neutral"

const getHoverBackground = (background: BackgroundColor, theme: Theme): string => {
  switch (background) {
    case "secondary":
      return theme.colors.background.tertiary
    case "secondaryOpacity":
      return theme.colors.background.tertiaryOpacity
    default:
      return theme.colors.background.tertiary
  }
}
