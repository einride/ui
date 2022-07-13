import { common } from "./common"
import { dark } from "./dark"
import { light } from "./light"
import { Theme } from "./types"

const lightTheme: Theme = {
  ...common,
  colors: light,
}

const darkTheme: Theme = {
  ...common,
  colors: dark,
}

export const themes = { light: lightTheme, dark: darkTheme }
