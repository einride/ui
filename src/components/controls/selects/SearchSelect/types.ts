import { ReactNode } from "react"

export interface BaseOption {
  key?: string
  label: ReactNode
  inputValue?: string
  value: string
}
