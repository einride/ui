import { useUncontrolled } from "@mantine/hooks"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps } from "../../../layout/Box/Box"
import { BaseInput, Status } from "../BaseInput/BaseInput"

interface SearchInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  /** Effective element used. */
  as?: ElementType

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: ComponentPropsWithoutRef<"span"> & { "data-testid"?: string }

  /** `onChange` handler. */
  onInputChange?: (input: string) => void

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}
interface SearchInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }
}

interface SearchInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type SearchInputProps = SearchInputBaseProps &
  (SearchInputWithLabelProps | SearchInputWithoutLabelProps)

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
