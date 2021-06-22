/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes } from "react";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton = ({ className, ...props }: BaseButtonProps) => {
  return (
    <button
      className={className}
      {...props}
      sx={{
        borderRadius: "48px",
        backgroundColor: "unset",
        border: "none",
        width: "240px",
        height: "48px",
        padding: "0px 16px",
        cursor: "pointer",
        ":disabled": {
          backgroundColor: "buttons.background.disabled",
          color: "buttons.text.disabled",
          cursor: "not-allowed",
        },
        ":focus": {
          textDecoration: "underline",
          outline: "none",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "border.selected",
        },
      }}
    >
      {props.children}
    </button>
  );
};
