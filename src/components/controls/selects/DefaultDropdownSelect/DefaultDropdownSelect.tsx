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

export interface DefaultDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  "aria-label": string
  as?: ElementType
  children: ReactNode
  isFullWidth?: boolean
  message?: ReactNode
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  status?: Status
}

export const DefaultDropdownSelect = forwardRef<
  HTMLSelectElement,
  DefaultDropdownSelectProps
>(
  (
    { children, isFullWidth = false, placeholder, status, message, ...props },
    ref,
  ) => {
    return (
      <>
        <Wrapper isFullWidth={isFullWidth}>
          <StyledSelect isFullWidth={isFullWidth} {...props} ref={ref}>
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </StyledSelect>
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
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const StyledSelect = styled.select<{ isFullWidth?: boolean }>`
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
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => theme.spacer}px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content.primary};
  width: ${({ theme }) => 3 * theme.spacer}px;
  text-align: center;
`
