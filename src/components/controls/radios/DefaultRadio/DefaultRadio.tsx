import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";

const StyledInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 12px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 24px;

  &:checked {
    border-width: 8px;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export interface DefaultRadioProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DefaultRadio = ({ ...props }: DefaultRadioProps) => {
  return <StyledInput type="radio" {...props} />;
};
