import styled from "@emotion/styled";
import { ChangeEvent } from "react";

const StyledTextarea = styled.textarea`
  display: block;
  min-width: 240px;
  resize: none;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: 12px 16px;
  border: unset;
  border-radius: 2px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.disabled};
  }

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }
`;

const TextAreaWithMargin = styled(StyledTextarea)`
  margin-top: 3px;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin-top: 5px;
`;

export interface TextareaProps {
  label?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const Textarea = ({ label, ...props }: TextareaProps) => {
  if (label) {
    return (
      <StyledLabel>
        {label}
        <TextAreaWithMargin {...props} />
      </StyledLabel>
    );
  }

  return <StyledTextarea {...props} />;
};
