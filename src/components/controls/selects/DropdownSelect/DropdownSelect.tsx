import styled from "@emotion/styled";
import { ReactNode } from "react";
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

export interface DropdownSelectProps {
  label: ReactNode;
  options: string[];
  placeholder: string;
}

export const DropdownSelect = ({
  label,
  options,
  placeholder,
  ...props
}: DropdownSelectProps) => {
  return (
    <DropdownWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect defaultValue="placeholder" {...props}>
        <option value="placeholder" hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </DropdownWrapper>
  );
};
