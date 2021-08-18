import styled from "@emotion/styled";
import { ChangeEvent } from "react";

const StyledTextarea = styled.textarea`
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
    color: ${({ theme }) => theme.colors.content.disabled};
  }

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected}
      inset;
    outline: none;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.content.secondary};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export interface TextareaProps {
  classname?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
}

export const Textarea = ({ classname, label, ...props }: TextareaProps) => {
  if (label) {
    return (
      <StyledLabel className={classname}>
        {label}
        <StyledTextarea {...props} />
      </StyledLabel>
    );
  }

  return <StyledTextarea className={classname} {...props} />;
};
