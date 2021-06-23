/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "./BaseButton";

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
    <BaseButton
      size={size}
      sx={{
        backgroundColor: "buttons.background.secondary",
        color: "buttons.text.secondary",
        ":hover:not(:disabled)": {
          backgroundColor: "buttons.background.hover.secondary",
        },
        ":active:not(:disabled)": {
          backgroundColor: "buttons.background.active.secondary",
        },
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};
