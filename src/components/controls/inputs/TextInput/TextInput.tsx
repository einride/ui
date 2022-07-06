import styled from "@emotion/styled"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput, Status } from "../BaseInput/BaseInput"

interface TextInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Effective element used. */
  as?: ElementType

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /**  Default is `neutral`. */
  status?: Status | undefined

  /** Controlled input value. */
  value?: string

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

interface TextInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
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
