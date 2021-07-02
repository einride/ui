import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.secondary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.secondary};
  }
`;

export interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "large";
}

export const SecondaryButton = ({
  children,
  size = "large",
  ...props
}: SecondaryButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
