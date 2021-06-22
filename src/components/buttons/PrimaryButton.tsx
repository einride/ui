/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "./BaseButton";

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
    <BaseButton
      size={size}
      sx={{
        backgroundColor: "buttons.background.primary",
        color: "buttons.text.primary",
        ":hover:not(:disabled)": {
          backgroundColor: "buttons.background.hover.primary",
        },
        ":active:not(:disabled)": {
          backgroundColor: "buttons.background.active.primary",
        },
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};
