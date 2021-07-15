import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)<TertiaryButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%"};
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
  fullWidth?: boolean;
  size?: "small" | "large";
}

export const TertiaryButton = ({
  children,
  fullWidth = false,
  size = "large",
  ...props
}: TertiaryButtonProps) => {
  return (
    <StyledBaseButton fullWidth={fullWidth} size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
