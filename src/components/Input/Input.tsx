import styled from "@emotion/styled";
import { ChangeEvent, ReactNode } from "react";

const Label = styled.label``;

const StyledInput = styled.input`
  display: block;
  color: var(--einride-black);
  background: var(--einride-white);
  border: 2px solid var(--einride-black);
  border-radius: 0;
  padding: 5px 10px;
`;

export interface InputProps {
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "number";
  value: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <Label>
      {label}
      <StyledInput {...props} />
    </Label>
  );
};

Input.defaultProps = {
  placeholder: undefined,
  type: "text",
};
