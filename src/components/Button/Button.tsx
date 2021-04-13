import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledButton = styled.button`
  background: var(--einride-black);
  color: var(--einride-white);
  padding: 10px;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;

    #arrow {
      color: var(--disabled);
    }
  }
`;

const Children = styled.span`
  margin-right: 40px;
`;

const Arrow = styled.span`
  color: var(--einride-green);
`;

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
      <Children>{children}</Children>
      <Arrow id="arrow">→</Arrow>
    </StyledButton>
  );
};

Button.defaultProps = {
  disabled: false,
};
