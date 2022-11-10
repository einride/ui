import { useUncontrolled } from "@mantine/hooks"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react"
import { BackgroundColor } from "../../../../main"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput } from "../BaseInput/BaseInput"

interface SearchInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the input field. Default is `secondary`. */
  background?: Extract<BackgroundColor, "secondary" | "secondaryOpacity">

  /** `onChange` handler. */
  onInputChange?: (input: string) => void // TODO: change name to onChange

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}
interface SearchInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
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
