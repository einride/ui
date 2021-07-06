import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { themes } from "../../theme";

interface EinrideProviderProps {
  children: ReactNode;
  colorMode?: "light" | "dark";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTheme?: any;
}

export const EinrideProvider = ({
  children,
  colorMode = "light",
  customTheme = {},
}: EinrideProviderProps) => {
  const defaultTheme = themes[colorMode];
  const theme = {
    ...defaultTheme,
    custom: customTheme[colorMode],
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
