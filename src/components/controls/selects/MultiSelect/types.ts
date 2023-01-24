import { ComponentPropsWithoutRef, ReactNode } from "react"

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
