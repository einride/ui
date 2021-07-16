import styled from "@emotion/styled";
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";
import chevronDown from "../../../../assets/icons/chevronDown.svg";

export const DropdownWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin: 5px 0 3px;
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.disabled};
  }
`;

const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.disabled};
  }
`;

export interface DropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultValue?: string;
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
}

export const DropdownSelect = ({
  defaultValue,
  label,
  options,
  placeholder,
  ...props
}: DropdownSelectProps) => {
  return (
    <DropdownWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect defaultValue={defaultValue || "placeholder"} {...props}>
        {!defaultValue && (
          <option value="placeholder" hidden>
            {placeholder || "Choose an option"}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </DropdownWrapper>
  );
};
