import "@emotion/react";
import type { Theme as ThemeType } from "../theme";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
