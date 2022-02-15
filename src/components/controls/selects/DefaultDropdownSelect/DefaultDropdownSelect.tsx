import styled from "@emotion/styled"
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react"
import { Icon } from "../../../content/Icon/Icon"

export interface DefaultDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  "aria-label": string
  children: ReactNode
  isFullWidth?: boolean
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
}

export const DefaultDropdownSelect = ({
  children,
  isFullWidth = false,
  placeholder,
  ...props
}: DefaultDropdownSelectProps) => {
  return (
    <Wrapper isFullWidth={isFullWidth}>
      <StyledSelect isFullWidth={isFullWidth} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </StyledSelect>
      <StyledIcon name="chevronDown" />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  min-width: 240px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const StyledSelect = styled.select<{ isFullWidth?: boolean }>`
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
  right: ${({ theme }) => 1.5 * theme.spacer}px;
  pointer-events: none;
`
