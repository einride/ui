/** @jsxImportSource theme-ui */
import { ReactNode } from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export interface PrimaryButtonProps extends BaseButtonProps {
  children: ReactNode;
}

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <BaseButton
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
