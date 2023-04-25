import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
  useCallback,
  useId,
  useState,
} from "react"
import { useTheme } from "../../../../hooks/useTheme"
import { ContentColor, Theme } from "../../../../lib/theme/types"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption, CaptionProps } from "../../../typography/Caption/Caption"

export interface BaseInputProps extends ComponentPropsWithoutRef<"input"> {
  /** Rendered element. */
  as?: ElementType

  /** Input label, displayed before input. */
  label?: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }

  /** Icon shown on the left side. */
  leftIcon?: ReactNode

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: MessageProps

  /** Icon shown on the right side. */
  rightIcon?: ReactNode

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Suffix shown after input value. For example `kg`. */
  suffix?: ReactNode

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, labelProps, leftIcon, message, rightIcon, status, suffix, wrapperProps, ...props },
    ref,
  ) => {
    const id = useId()
    const messageId = useId()
    const [suffixInlineSizePx, setSuffixInlineSizePx] = useState(0)
    const suffixRef = useCallback((node: HTMLDivElement | null) => {
      setSuffixInlineSizePx(node ? node.offsetWidth : 0)
    }, [])
    const theme = useTheme()
    const inlineEndOffsetRem = getInlineEndOffsetRem(suffixInlineSizePx, !!rightIcon, theme)

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
            inlineEndOffsetRem={inlineEndOffsetRem}
            id={id}
            ref={ref}
          />
          {suffix && (
            <Suffix rightIcon={!!rightIcon} ref={suffixRef}>
              {suffix}
            </Suffix>
          )}
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

export interface MessageProps extends Omit<CaptionProps, "children"> {
  "data-testid"?: string
}

const getInlineEndOffsetRem = (
  suffixInlineSizePx: number,
  rightIcon: boolean,
  theme: Theme,
): number => {
  if (suffixInlineSizePx && rightIcon) {
    return suffixInlineSizePx / 16 + 5 * theme.spacingBase
  }
  if (suffixInlineSizePx) {
    return suffixInlineSizePx / 16 + 2 * theme.spacingBase
  }
  if (rightIcon) {
    return 4 * theme.spacingBase
  }
  return 0
}

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-block-start: 5px;
  padding-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  inset-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftIconWrapper = styled(IconWrapper)`
  inset-inline-start: ${({ theme }) => theme.spacingBase}rem;
  pointer-events: none;
`

const RightIconWrapper = styled(IconWrapper)`
  inset-inline-end: ${({ theme }) => theme.spacingBase}rem;
`

interface StyledInputProps {
  hasLabel: boolean
  leftIcon: boolean
  rightIcon: boolean
  inlineEndOffsetRem: number
}

const StyledInput = styled.input<StyledInputProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  padding-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
  padding-inline-end: ${({ inlineEndOffsetRem, theme }) =>
    inlineEndOffsetRem + 2 * theme.spacingBase}rem;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  ${({ leftIcon, theme }) => leftIcon && `padding-inline-start: ${4.5 * theme.spacingBase}rem`};

  &:read-only:not(:disabled) {
    padding-inline-start: 0;
    background: none;
  }

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:focus:read-only {
    box-shadow: none;
  }

  &:hover:not(:disabled, :read-only) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
    opacity: 1; // To overwrite the default opacity some browsers (e.g. Firefox) set on placeholders
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }
`

const Suffix = styled.div<{ rightIcon: boolean }>`
  position: absolute;
  inset-block: 0;
  inset-inline-end: ${({ rightIcon, theme }) => (rightIcon ? 5 : 2) * theme.spacingBase}rem;
  color: ${({ theme }) => theme.colors.content.secondary};
  display: flex;
  align-items: center;
  pointer-events: none;
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
