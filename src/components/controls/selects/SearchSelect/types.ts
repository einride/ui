import { ReactNode } from "react"

export interface BaseOption {
  /** Formatted, human readable value */
  label: ReactNode
  /** Human readable value – fallback if `value` is not human readable */
  inputValue?: string
  /** Unique identifier */
  value: string
}
