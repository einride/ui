import styled from "@emotion/styled"
import { useUuid } from "@mantine/hooks"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
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
    const id = useUuid()

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
            label={!!label}
            leftIcon={!!leftIcon}
            rightIcon={!!rightIcon}
            id={id}
            ref={ref}
          />
          {rightIcon && <RightIconWrapper>{rightIcon}</RightIconWrapper>}
        </InputWrapper>
        {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
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
  margin-top: 5px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  bottom: ${({ theme }) => 1.5 * theme.spacer}px;
  height: ${({ theme }) => 3 * theme.spacer}px;
  width: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftIconWrapper = styled(IconWrapper)`
  left: ${({ theme }) => theme.spacer}px;
`

const RightIconWrapper = styled(IconWrapper)`
  right: ${({ theme }) => theme.spacer}px;
`

const StyledInput = styled.input<{ label: boolean; leftIcon: boolean; rightIcon: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  width: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ label, theme }) => (label ? theme.borderRadii.sm : theme.borderRadii.xl)};
  ${({ leftIcon, theme }) => leftIcon && `padding-left: ${4.5 * theme.spacer}px`};
  ${({ rightIcon, theme }) => rightIcon && `padding-right: ${6 * theme.spacer}px`};

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

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
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
