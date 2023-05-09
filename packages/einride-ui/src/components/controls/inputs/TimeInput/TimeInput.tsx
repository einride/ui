import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps } from "../../../layout/Box/Box"
import { BaseInput, MessageProps, Status } from "../BaseInput/BaseInput"

interface TimeInputBaseProps extends ComponentPropsWithoutRef<"input"> {
  /** Disables the input. */
  disabled?: boolean

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

interface TimeInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label"> & { "data-testid"?: string }
}

interface TimeInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type TimeInputProps = TimeInputBaseProps &
  (TimeInputWithLabelProps | TimeInputWithoutLabelProps)

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ message, status, ...props }, ref) => {
    return (
      <StyledBaseInput
        {...props}
        type="time"
        message={message}
        rightIcon={getStatusIcon(status)}
        status={status}
        ref={ref}
      />
    )
  },
)

const getStatusIcon = (status?: Status): React.JSX.Element | null => {
  switch (status) {
    case "success":
      return <PositiveIcon name="checkmark" />
    case "fail":
      return <NegativeIcon name="warning" />
    default:
      return null
  }
}

const StyledIcon = styled(Icon)`
  pointer-events: none;
`

const PositiveIcon = styled(StyledIcon)`
  color: ${({ theme }) => theme.colors.content.positive};
`

const NegativeIcon = styled(StyledIcon)`
  color: ${({ theme }) => theme.colors.content.negative};
`

const StyledBaseInput = styled(BaseInput)`
  // ios fix
  display: flex;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`
