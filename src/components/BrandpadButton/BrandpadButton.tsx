import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledBrandpadButton = styled.button`
  background: var(--button-background);
  color: var(--button-color);
  padding: 10px;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Children = styled.span`
  margin-right: 40px;
`;

const Arrow = styled.span`
  color: var(--electric-green);
`;

export interface BrandpadButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const BrandpadButton = ({ children, ...props }: BrandpadButtonProps) => {
  return (
    <StyledBrandpadButton {...props}>
      <Children>{children}</Children>
      <Arrow>→</Arrow>
    </StyledBrandpadButton>
  );
};

BrandpadButton.defaultProps = {
  disabled: false,
};
