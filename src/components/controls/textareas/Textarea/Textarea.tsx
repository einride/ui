import styled from "@emotion/styled"
import { ChangeEvent, CSSProperties, ElementType } from "react"

export interface TextareaProps {
  as?: ElementType
  classname?: string
  label?: string
  labelStyles?: CSSProperties
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value: string
}

export const Textarea = ({
  label,
  labelStyles = {},
  ...props
}: TextareaProps) => {
  if (label) {
    return (
      <StyledLabel style={labelStyles}>
        {label}
        <StyledTextarea {...props} />
      </StyledLabel>
    )
  }

  return <StyledTextarea {...props} />
}

const StyledTextarea = styled.textarea`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: block;
  min-width: 100%;
  resize: none;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;
  flex-grow: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }
`

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.content.secondary};
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`
