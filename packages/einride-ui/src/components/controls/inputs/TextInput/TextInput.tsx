import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps } from "../../../layout/Box/Box"
import { BaseInput, MessageProps, Status } from "../BaseInput/BaseInput"

interface TextInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  /** Effective element used. */
  as?: ElementType

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

interface TextInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }
}

interface TextInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type TextInputProps = TextInputBaseProps &
  (TextInputWithLabelProps | TextInputWithoutLabelProps)

/** Capture string input from user. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ message, suffix, status, ...props }, ref) => {
    return (
      <BaseInput
        {...props}
        message={message}
        rightIcon={getStatusIcon(status)}
        status={status}
        suffix={suffix}
        ref={ref}
      />
    )
  },
)

const getStatusIcon = (status?: Status): JSX.Element | null => {
  switch (status) {
    case "success":
      return <Icon color="positive" name="checkmark" />
    case "fail":
      return <Icon color="negative" name="warning" />
    default:
      return null
  }
}
