/** @jsxImportSource theme-ui */
import { ReactNode } from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export interface PrimaryButtonProps extends BaseButtonProps {
  children: ReactNode;
}

export const PrimaryButton = ({
  className,
  children,
  ...props
}: PrimaryButtonProps) => {
  return (
    <BaseButton
      className={className}
      {...props}
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
    >
      {children}
    </BaseButton>
  );
};
