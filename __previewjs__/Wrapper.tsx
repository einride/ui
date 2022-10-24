import { ReactNode } from "react"
import { EinrideProvider, einrideTheme } from "../src/main"
import "./styles.css"

interface WrapperProps {
  children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps): JSX.Element => (
  <EinrideProvider theme={einrideTheme} colorMode="system">
    {children}
  </EinrideProvider>
)
