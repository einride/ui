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

export interface LabelSelectProps
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

export const LabelSelect = forwardRef<HTMLSelectElement, LabelSelectProps>(
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
      <Wrapper isFullWidth={isFullWidth}>
        <InnerWrapper>
          <StyledLabel>
            {label}
            <StyledSelect isFullWidth={isFullWidth} {...props} ref={ref}>
              {placeholder && <option value="">{placeholder}</option>}
              {children}
            </StyledSelect>
          </StyledLabel>

          <StyledIcon name="chevronDown" />
        </InnerWrapper>
        {message && (
          <Caption color={getMessageColor(status)}>{message}</Caption>
        )}
      </Wrapper>
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
  display: inline-block;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const InnerWrapper = styled.div`
  position: relative;
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
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  line-height: 24px;
  display: block;
  padding: 12px 16px;
  padding-right: ${({ theme }) => 6 * theme.spacer}px;
  border: unset;
  border-radius: 2px;
  cursor: pointer;
  appearance: none;
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
  width: ${({ theme }) => 3 * theme.spacer}px;
  text-align: center;
`
