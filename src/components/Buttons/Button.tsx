/** @jsxImportSource theme-ui */
import { ReactNode } from "react";

const getHeight = (size: "small" | "large") => {
  switch (size) {
    case "small":
      return "48px";
    case "large":
      return "56px";
    default:
      return "48px";
  }
};

const getBorderRadius = (size: "small" | "large") => {
  switch (size) {
    case "small":
      return "48px";
    case "large":
      return "56px";
    default:
      return "48px";
  }
};
export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  size: "small" | "large";
  variant: "primary" | "secondary" | "tertiary";
}

export const Button = ({
  children,
  size = "small",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const height = getHeight(size);
  const borderRadius = getBorderRadius(size);

  return (
    <button
      {...props}
      sx={{
        height,
        width: "240px",
        borderRadius,
        border: "none",
        outline: "none",
        fontSize: 1,
        variant: `buttons.${variant}`,
        ":focus": {
          textDecoration: "underline",
        },
        ":disabled": {
          backgroundColor: "#F5F5F5",
          color: "#ABABAB",
        },
      }}
    >
      {children}
    </button>
  );
};
