import styled from "@emotion/styled";
import { ReactNode } from "react";

interface StyledButtonProps {
  isFullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background: var(--button-background);
  color: var(--button-color);
  border-radius: var(--button-border-radius);
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  border: none;
  text-align: left;
  padding: 20px 15px;
  cursor: pointer;

  #arrow {
    display: inline-block;
    transition: transform 100ms linear;
  }

  &:active:not(:disabled) {
    background: #222222;

    #arrow {
      transform: translateX(5px);
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media screen and (min-width: 1000px) {
    &:hover:not(:disabled) {
      background: #222222;

      #arrow {
        transform: translateX(5px);
      }
    }
  }
`;

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  formId?: string;
  hasArrow?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button = ({ children, hasArrow, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {children} {hasArrow && <span id="arrow"> →</span>}
    </StyledButton>
  );
};

Button.defaultProps = {
  disabled: false,
  formId: undefined,
  hasArrow: false,
  isFullWidth: false,
  onClick: undefined,
  type: "button",
};

const StyledBrandpadButton = styled.button`
  background: var(--button-background);
  color: var(--button-color);
  padding: 10px;
  border: none;
`;

const Children = styled.span`
  margin-right: 40px;
`;

const Arrow = styled.span`
  color: var(--electric-green);
`;

export interface BrandpadButtonProps {
  children: ReactNode;
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
