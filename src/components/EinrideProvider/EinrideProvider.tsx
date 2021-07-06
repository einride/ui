import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { light } from "../../theme";

interface EinrideProviderProps {
  children: ReactNode;
}

export const EinrideProvider = ({ children }: EinrideProviderProps) => {
  return <ThemeProvider theme={light}>{children}</ThemeProvider>;
};
