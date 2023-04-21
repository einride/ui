import styled from "@emotion/styled"
import { useMergedRef, useUncontrolled } from "@mantine/hooks"
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
  useRef,
} from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps } from "../../../layout/Box/Box"
import { BaseInput, MessageProps, Status } from "../BaseInput/BaseInput"

interface SearchInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  /** Effective element used. */
  as?: ElementType

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: MessageProps

  /** Props passed to the clear button element. */
  clearButtonProps?: ButtonHTMLAttributes<HTMLButtonElement> | undefined

  /** `onChange` handler. */
  onInputChange?: (input: string) => void

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Suffix shown after input value. For example `kg`. */
  suffix?: ReactNode

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

export type SearchInputProps = SearchInputBaseProps &
  (SearchInputWithLabelProps | SearchInputWithoutLabelProps)

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, defaultValue, onInputChange, clearButtonProps, suffix, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null)
    const combinedRef = useMergedRef(ref, innerRef)

    const [_value = "", handleChange] = useUncontrolled({
      value,
      defaultValue,
      onChange: onInputChange,
    })

    const onClearInput = (): void => {
      handleChange("")
      innerRef.current?.focus()
    }

    return (
      <BaseInput
        {...props}
        leftIcon={<Icon name="loupe" />}
        onChange={(e) => handleChange?.(e.target.value)}
        rightIcon={
          _value?.toString()?.length ? (
            <ClearButton
              type="button"
              onClick={onClearInput}
              {...clearButtonProps}
              aria-label="Clear input"
            >
              <Icon name="xMark" />
            </ClearButton>
          ) : null
        }
        suffix={suffix}
        value={_value}
        ref={combinedRef}
      />
    )
  },
)

const ClearButton = styled.button`
  inline-size: 100%;
  block-size: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.sm};

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.0625rem ${({ theme }) => theme.colors.border.selected};
  }
`
