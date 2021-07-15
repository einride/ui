import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)<SecondaryButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%"};
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
  fullWidth?: boolean;
  size?: "small" | "large";
}

export const SecondaryButton = ({
  children,
  fullWidth = false,
  size = "large",
  ...props
}: SecondaryButtonProps) => {
  return (
    <StyledBaseButton fullWidth={fullWidth} size={size} {...props}>
      {children}
    </StyledBaseButton>
  );
};
