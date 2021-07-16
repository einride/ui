import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";
import checkmark from "../../../../assets/icons/checkmark.svg";
import dash from "../../../../assets/icons/dash.svg";

const StyledInput = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  margin: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.selected};
  }

  &:checked {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background-color: ${({ theme }) => theme.colors.content.primary};
    background-image: url(${checkmark});
    background-repeat: no-repeat;
    background-position: center;
  }

  &:indeterminate {
    border: 2px solid ${({ theme }) => theme.colors.border.selected};
    background-color: ${({ theme }) => theme.colors.content.primary};
    background-image: url(${dash});
    background-repeat: no-repeat;
    background-position: center;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
  }
`;

export interface DefaultCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DefaultCheckbox = ({ ...props }: DefaultCheckboxProps) => {
  return <StyledInput type="checkbox" {...props} />;
};
