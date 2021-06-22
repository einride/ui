/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ReactComponent as ArrowRightwards } from "../../assets/icons/arrowRightwards.svg";
import { BaseButton } from "./BaseButton";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  size?: "small" | "large";
}

export const IconButton = ({
  children,
  icon = <ArrowRightwards sx={{ fill: "positive" }} />,
  size = "large",
  ...props
}: IconButtonProps) => {
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
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
        {icon}
      </div>
    </BaseButton>
  );
};
