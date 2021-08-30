import styled from "@emotion/styled";
import * as React from "react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)<PrimaryButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%"};
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
  fullWidth?: boolean;
  size?: "small" | "large";
}

export const PrimaryButton = ({
  children,
  fullWidth = false,
  size = "large",
  ...props
}: PrimaryButtonProps) => {
  return (
    <StyledBaseButton fullWidth={fullWidth} size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
