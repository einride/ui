import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react"
import chevronDown from "../../../../assets/icons/chevronDown.svg"

export interface DefaultDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
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
    <StyledSelect isFullWidth={isFullWidth} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </StyledSelect>
  )
}

interface StyledSelectProps {
  isFullWidth?: boolean
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  min-width: 240px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  line-height: 24px;
  display: block;
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;
  cursor: pointer;
  appearance: none;
  background-image: url(${chevronDown});
  background-repeat: no-repeat;
  background-position: calc(100% - 16px);
  padding-right: 29px;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.disabled};
  }
`
