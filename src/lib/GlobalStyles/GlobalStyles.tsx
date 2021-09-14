import { Global, useTheme } from "@emotion/react"
import * as React from "react"

export const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={`
        html {
          font-family: ${theme.fonts.body};
        }
      `}
    />
  )
}
