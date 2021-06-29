import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.buttons.background.tertiary};
  color: ${({ theme }) => theme.colors.buttons.text.tertiary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.tertiary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.tertiary};
  }
`;

export interface TertiaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "large";
}

export const TertiaryButton = ({
  children,
  size = "large",
  ...props
}: TertiaryButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
