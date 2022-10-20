import { useUncontrolled } from "@mantine/hooks"
import { ElementType, forwardRef, HTMLAttributes, InputHTMLAttributes } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput } from "../BaseInput/BaseInput"

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string

  /** Effective element used. */
  as?: ElementType

  /** `onChange` handler. */
  onInputChange?: (input: string) => void // TODO: change name to onChange

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, defaultValue, onInputChange, ...props }, ref) => {
    const [_value, handleChange] = useUncontrolled({
      value,
      defaultValue,
      onChange: onInputChange,
    })

    return (
      <BaseInput
        {...props}
        leftIcon={<Icon name="loupe" />}
        onChange={(e) => handleChange?.(e.target.value)}
        rightIcon={
          _value?.toString()?.length ? (
            <button
              type="button"
              onClick={() => handleChange("")}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <Icon name="xMark" color="primary" />
            </button>
          ) : null
        }
        value={_value}
        ref={ref}
      />
    )
  },
)
