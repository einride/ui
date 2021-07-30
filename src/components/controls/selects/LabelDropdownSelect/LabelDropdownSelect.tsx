import styled from "@emotion/styled";
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";
import { DefaultDropdownSelect } from "../DefaultDropdownSelect";

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin-top: 5px;

  &:focus-within {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`;

const StyledDefaultDropdown = styled(DefaultDropdownSelect)`
  margin-top: 3px;
`;

interface Option {
  key?: string;
  value: string;
}

export interface LabelDropdownSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultValue?: string;
  fullWidth?: boolean;
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
}

export const LabelDropdownSelect = ({
  label,
  ...props
}: LabelDropdownSelectProps) => {
  return (
    <StyledLabel>
      {label}
      <StyledDefaultDropdown {...props} />
    </StyledLabel>
  );
};
