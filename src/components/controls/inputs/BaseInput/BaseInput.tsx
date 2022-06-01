import styled from "@emotion/styled"
import {
  ChangeEvent,
  ElementType,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ElementType
  onBlur?: ((e: FocusEvent<HTMLInputElement>) => void) | undefined
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined
  icon?: ReactNode
  placeholder?: string
  value?: string | undefined
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(({ icon, ...props }, ref) => {
  return (
    <ContentWrapper>
      <StyledInput {...props} ref={ref} />
      <IconWrapper>{icon}</IconWrapper>
    </ContentWrapper>
  )
})

const ContentWrapper = styled.div`
  position: relative;
  display: block;
`

const StyledInput = styled.input`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  width: 100%;
  display: block;
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;

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

const IconWrapper = styled.span`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => 2 * theme.spacer}px;
`
