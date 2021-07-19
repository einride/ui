import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { DefaultRadio } from "../DefaultRadio";

const StyledLabel = styled.label`
  display: flex;
  margin: 12px 16px;
  color: ${({ theme }) => theme.colors.content.primary};

  &:focus-within {
    text-decoration: underline;
  }
`;

const StyledDefaultRadio = styled(DefaultRadio)`
  margin: 0 16px 0 0;
`;

export interface LabelRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LabelRadio = ({ label, ...props }: LabelRadioProps) => {
  return (
    <StyledLabel>
      <StyledDefaultRadio type="radio" {...props} />
      {label}
    </StyledLabel>
  );
};
