import styled from "@emotion/styled"
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ message, status, ...props }, ref) => {
    return (
      <BaseInput
        {...props}
        message={message}
        rightIcon={getStatusIcon(status)}
        status={status}
        ref={ref}
      />
    )
  },
)

const getStatusIcon = (status?: Status): JSX.Element | null => {
  switch (status) {
    case "success":
      return <PositiveIcon name="checkmark" />
    case "fail":
      return <NegativeIcon name="warning" />
    default:
      return null
  }
}

const PositiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.content.positive};
`

const NegativeIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.content.negative};
`
