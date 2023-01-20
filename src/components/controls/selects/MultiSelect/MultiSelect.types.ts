import { ComponentPropsWithoutRef, ReactNode } from "react"
import { BoxProps } from "../../../layout/Box/Box"

export interface MultiSelectBaseProps<Option> {
  /** Props passed to the clear button element. */
  clearButtonProps?: ComponentPropsWithoutRef<"button"> & { "data-testid": string }

  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  clearSearchAfterSelect?: boolean

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Callback called when the clear button is clicked. */
  onClearClick?: () => void

  /** Callback called when the selection changes. */
  onSelectionChange?: (options: Option[]) => void

  /** Callback called when the input field is updated. */
  onSearchChange?: (value: string) => void

  /** Options to render in dropdown. */
  options: Option[] | undefined

  /** Props passed to the individual options. */
  optionProps?: ComponentPropsWithoutRef<"div">

  inputProps?: ComponentPropsWithoutRef<"input">

  /**  Default is `neutral`. */
  status?: Status

  /** Controlled input value. */
  value: Option[]

  /** Props passed to root element. */
  wrapperProps?: BoxProps

  placeholder?: string
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

export type MultiSelectProps<Option> = MultiSelectBaseProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

export type Direction = "start" | "end"

export type Status = "success" | "fail" | "neutral"
