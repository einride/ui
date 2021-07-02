import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.primary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.primary};
  }
`;

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "large";
}

export const PrimaryButton = ({
  children,
  size = "large",
  ...props
}: PrimaryButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
