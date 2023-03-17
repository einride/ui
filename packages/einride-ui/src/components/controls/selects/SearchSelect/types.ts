import { ReactNode } from "react"

export interface BaseOption {
  /** @deprecated since v7.13.0. `key` is not needed when using `value`, since `value` has to be unique. Use `value` instead! */
  key?: string
  /** Formatted, human readable value */
  label: ReactNode
  /** Human readable value – fallback if `value` is not human readable */
  inputValue?: string
  /** Unique identifier */
  value: string
}
