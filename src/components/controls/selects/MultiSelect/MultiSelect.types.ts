import { ComponentPropsWithoutRef, ReactNode } from "react"
import { BoxProps } from "../../../layout/Box/Box"

export interface MultiSelectInputBaseProps<Option> {
  /** Unique ID. */
  id: string

  /** Reflects state of the dropdown. */
  isOpen: boolean

  /** Callback for onFocus/onBlur. */
  onFocusToggle: (isOpen: boolean) => void

  /** Set highlighted index within selected options. */
  onIndexHighlight: (index: number | null) => void

  /** Highlighted index within selected options. */
  highlightedIndex: number | null

  /** Options filtered by search term. */
  filteredOptions: Option[]

  /** Options selected by user. */
  selectedOptions: Option[]

  /** Search term (controlled). */
  inputValue: string
}

export interface MultiSelectInputSharedProps<Option> {
  /** Input placeholder. */
  placeholder?: string

  /** Default is `neutral`. */
  status?: Status

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to the input element. */
  inputProps?: ComponentPropsWithoutRef<"input"> & { "data-testid": string }

  /** Props passed to the clear button element. */
  clearButtonProps?: ComponentPropsWithoutRef<"button"> & { "data-testid": string }

  /** Callback called when the input field is updated. */
  onSearchChange: (value: string) => void

  /** Callback called when the selection changes. */
  onSelectionChange: (options: Option[]) => void

  /** Callback called when the clear button is clicked. */
  onClearClick?: () => void
}

export interface MultiSelectBaseProps<Option> {
  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  clearSearchAfterSelect?: boolean

  /** Options to render in dropdown. */
  options: Option[] | undefined

  /** Props passed to the individual options. */
  optionProps?: ComponentPropsWithoutRef<"div">

  /** Controlled input value. */
  value?: Option[]

  /** Props passed to root element. */
  wrapperProps?: BoxProps
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

export type MultiSelectInputProps<Option> = MultiSelectInputBaseProps<Option> &
  MultiSelectInputSharedProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

export type MultiSelectProps<Option> = Partial<MultiSelectInputSharedProps<Option>> &
  MultiSelectBaseProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

export type Direction = "start" | "end"

export type Status = "success" | "fail" | "neutral"
