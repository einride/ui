/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "./BaseButton";

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
    <BaseButton
      size={size}
      sx={{
        backgroundColor: "buttons.background.tertiary",
        color: "buttons.text.tertiary",
        ":hover:not(:disabled)": {
          backgroundColor: "buttons.background.hover.tertiary",
        },
        ":active:not(:disabled)": {
          backgroundColor: "buttons.background.active.tertiary",
        },
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
};
