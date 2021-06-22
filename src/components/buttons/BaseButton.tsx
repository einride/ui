/** @jsxImportSource theme-ui */
import { ButtonHTMLAttributes } from "react";

const HEIGHT_PIXELS = 56;

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defaults to large */
  size: "small" | "large";
}

export const BaseButton = ({ size, ...props }: BaseButtonProps) => {
  return (
    <button
      sx={{
        borderRadius: `${HEIGHT_PIXELS}px`,
        backgroundColor: "unset",
        border: "none",
        width: "240px",
        height: size === "small" ? "48px" : `${HEIGHT_PIXELS}px`,
        padding: "0px 16px",
        cursor: "pointer",
        ":disabled": {
          backgroundColor: "buttons.background.disabled",
          color: "buttons.text.disabled",
          cursor: "not-allowed",
        },
        ":disabled svg": {
          fill: "buttons.text.disabled",
        },
        ":focus": {
          textDecoration: "underline",
          outline: "none",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "border.selected",
        },
      }}
      {...props}
    >
      {props.children}
    </button>
  );
};
