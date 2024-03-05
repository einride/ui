import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps } from "../../../layout/Box/Box"
import { BaseInput, MessageProps, Status } from "../BaseInput/BaseInput"

interface NumberInputInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  /** Rendered element. */
  as?: ElementType

  /** Disables the input. */
  disabled?: boolean

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: MessageProps

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Suffix shown after input value. For example `kg`. */
  suffix?: ReactNode

  /** Controlled input value. */
  value?: string

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

interface NumberInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }
}

interface NumberInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type NumberInputProps = NumberInputInputBaseProps &
  (NumberInputWithLabelProps | NumberInputWithoutLabelProps)

/** Capture number input from user. */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ message, suffix, status, ...props }, ref) => {
    return (
      <BaseInput
        {...props}
        inputMode="numeric"
        message={message}
        rightIcon={getStatusIcon(status)}
        status={status}
        suffix={suffix}
        ref={ref}
      />
    )
  },
)

const getStatusIcon = (status?: Status): React.JSX.Element | null => {
  switch (status) {
    case "success":
      return <Icon color="positive" name="checkmark" />
    case "fail":
      return <Icon color="negative" name="warning" />
    default:
      return null
  }
}
