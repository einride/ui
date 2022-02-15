import styled from "@emotion/styled"
import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from "react"

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onBlur?: ((e: FocusEvent<HTMLInputElement>) => void) | undefined
  onChange: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined
  icon?: ReactNode
  placeholder: string
  value: string
}

export const BaseInput = ({ icon, ...props }: BaseInputProps) => {
  return (
    <ContentWrapper>
      <StyledInput {...props} />
      <IconWrapper>{icon}</IconWrapper>
    </ContentWrapper>
  )
}

const StyledInput = styled.input`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
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
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const ContentWrapper = styled.label`
  position: relative;
  display: block;
`

const IconWrapper = styled.span`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => 2 * theme.spacer}px;
`
