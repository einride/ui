import styled from "@emotion/styled"
import {
  ChangeEvent,
  ElementType,
  forwardRef,
  ReactNode,
  SelectHTMLAttributes,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"

export interface LabelDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  as?: ElementType
  children: ReactNode
  isFullWidth?: boolean
  label: ReactNode
  message?: ReactNode
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  status?: Status
}

export const LabelDropdownSelect = forwardRef<
  HTMLSelectElement,
  LabelDropdownSelectProps
>(
  (
    {
      children,
      isFullWidth = false,
      label,
      placeholder,
      status,
      message,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <Wrapper isFullWidth={isFullWidth}>
          <StyledLabel>
            {label}
            <StyledSelect isFullWidth={isFullWidth} {...props} ref={ref}>
              {placeholder && <option value="">{placeholder}</option>}
              {children}
            </StyledSelect>
          </StyledLabel>

          <StyledIcon name="chevronDown" />
        </Wrapper>
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </>
    )
  },
)

type Status = "success" | "fail" | "neutral"

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

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  min-width: 240px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.secondary};
  margin-top: 5px;

  &:focus-within {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`

interface StyledSelectProps {
  isFullWidth?: boolean
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  min-width: 240px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  line-height: 24px;
  display: block;
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;
  cursor: pointer;
  appearance: none;
  padding-right: 29px;
  margin-top: 3px;
  position: relavtive;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  right: ${({ theme }) => 1.5 * theme.spacer}px;
  bottom: ${({ theme }) => 1.5 * theme.spacer}px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content.primary};
`
