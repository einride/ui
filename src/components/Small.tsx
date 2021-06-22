/** @jsxImportSource theme-ui */
import { ReactNode } from "react";

export interface SmallProps {
  children: ReactNode;
}

export const Small = ({ children }: SmallProps) => {
  return (
    <p
      sx={{
        fontSize: 0,
        paddingTop: "3px",
        paddingBottom: "5px",
        lineHeight: "16px",
      }}
    >
      {children}
    </p>
  );
};
