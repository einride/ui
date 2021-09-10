import styled from "@emotion/styled"
import * as React from "react"
import { ChangeEvent, FocusEvent, InputHTMLAttributes } from "react"

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  width: 100%;
  display: block;
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.disabled};
  }
`

const ContentWrapper = styled.label`
  position: relative;
  display: block;

  &::after {
    content: attr(data-icon);
    position: absolute;
    top: 12px;
    right: 16px;
  }
`

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  icon?: string
  placeholder: string
  value: string
}

export const BaseInput = ({ icon, ...props }: BaseInputProps) => {
  return (
    <ContentWrapper data-icon={icon}>
      <StyledInput {...props} />
    </ContentWrapper>
  )
}
