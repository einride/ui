import styled from "@emotion/styled";
import { ChangeEvent, SelectHTMLAttributes } from "react";
import chevronDown from "../../../../assets/icons/chevronDown.svg";

const StyledSelect = styled.select`
  min-width: 240px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: 18px;
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
`;

interface Option {
  key?: string;
  value: string;
}

export interface DefaultDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultValue?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
}

export const DefaultDropdownSelect = ({
  defaultValue,
  options,
  placeholder,
  ...props
}: DefaultDropdownSelectProps) => {
  return (
    <StyledSelect defaultValue={defaultValue || "placeholder"} {...props}>
      {!defaultValue && (
        <option value="placeholder" hidden>
          {placeholder || "Choose an option"}
        </option>
      )}
      {options.map((option) => (
        <option key={option.key ?? option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </StyledSelect>
  );
};
