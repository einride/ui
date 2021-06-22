/** @jsxImportSource theme-ui */
import { ReactNode } from "react";

export interface BodyProps {
  children: ReactNode;
}

export const Body = ({ children }: BodyProps) => {
  return (
    <p
      sx={{
        fontSize: 1,
        paddingTop: "5px",
        paddingBottom: "3px",
        lineHeight: "body",
      }}
    >
      {children}
    </p>
  );
};
