import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { DefaultCheckbox } from "../DefaultCheckbox";

const StyledLabel = styled.label`
  margin: 12px 16px;
  display: flex;
  color: ${({ theme }) => theme.colors.content.primary};

  &:focus-within {
    text-decoration: underline;
  }
`;

const StyledDefaultCheckbox = styled(DefaultCheckbox)`
  margin: 0 16px 0 0;
`;

export interface LabelCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelCheckbox = ({ label, ...props }: LabelCheckboxProps) => {
  return (
    <StyledLabel>
      <StyledDefaultCheckbox {...props} />
      {label}
    </StyledLabel>
  );
};
