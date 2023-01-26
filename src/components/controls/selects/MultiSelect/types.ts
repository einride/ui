import { ComponentPropsWithoutRef, ReactNode } from "react"

export interface BaseOption {
  /** Formatted, human readable value */
  label: ReactNode
  /** Human readable value */
  inputValue: string
  /** Unique identifier */
  value: string
}

export interface MultiSelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

export interface MultiSelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type Direction = "start" | "end"

export type Status = "success" | "fail" | "neutral"
