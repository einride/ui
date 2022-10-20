import styled from "@emotion/styled"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useId,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Caption } from "../../../typography/Caption/Caption"

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Effective element used. */
  as?: ElementType

  /** Input label, displayed before input. */
  label?: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>

  /** Icon shown on the left side. */
  leftIcon?: ReactNode

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Icon shown on the right side. */
  rightIcon?: ReactNode

  /**  Default is `neutral`. */
  status?: Status | undefined

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, labelProps, leftIcon, message, rightIcon, status, wrapperProps, ...props }, ref) => {
    const id = useId()
    const messageId = useId()

    return (
      <Wrapper {...wrapperProps}>
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

const StyledInput = styled.input<{ hasLabel: boolean; leftIcon: boolean; rightIcon: boolean }>`
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
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  ${({ leftIcon, theme }) => leftIcon && `padding-inline-start: ${4.5 * theme.spacer}px`};
  ${({ rightIcon, theme }) => rightIcon && `padding-inline-end: ${6 * theme.spacer}px`};

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
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
