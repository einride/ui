import { ElementType, forwardRef, HTMLAttributes, InputHTMLAttributes } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput } from "../BaseInput/BaseInput"

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string

  /** Effective element used. */
  as?: ElementType

  /** `onChange` handler. */
  onInputChange?: (input: string) => void

  /** Controlled input value. */
  value?: string

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onInputChange, ...props }, ref) => {
    return (
      <BaseInput
        {...props}
        leftIcon={<Icon name="loupe" />}
        onChange={(e) => onInputChange?.(e.target.value)}
        rightIcon={
          value?.length ? (
            <button type="button" onClick={() => onInputChange?.("")}>
              <Icon name="xMark" color="primary" />
            </button>
          ) : null
        }
        value={value}
        ref={ref}
      />
    )
  },
)
