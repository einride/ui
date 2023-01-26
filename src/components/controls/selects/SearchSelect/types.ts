import { ReactNode } from "react"

export interface BaseOption {
  /** @deprecated since 7.12 */
  key?: string
  /** Formatted, human readable value */
  label: ReactNode
  /** Human readable value */
  inputValue?: string
  /** Unique identifier */
  value: string
}
