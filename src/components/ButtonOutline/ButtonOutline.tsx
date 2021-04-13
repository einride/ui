import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledButtonOutline = styled.button`
  background: var(--einride-white);
  color: var(--button-color);
  padding: 10px;
  border-radius: 100px;
  border: 2px solid var(--einride-black);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    color: var(--disabled);
    border-color: var(--disabled);
  }
`;

export interface ButtonOutlineProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const ButtonOutline = ({ children, ...props }: ButtonOutlineProps) => {
  return <StyledButtonOutline {...props}>{children}</StyledButtonOutline>;
};

ButtonOutline.defaultProps = {
  disabled: false,
};
