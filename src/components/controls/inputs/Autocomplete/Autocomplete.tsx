import styled from "@emotion/styled"
import { useId } from "@mantine/hooks"
import {
  ChangeEvent,
  CSSProperties,
  ElementType,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react"
import { useTheme } from "../../../../hooks/useTheme"
import { Theme } from "../../../../lib/theme/theme"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"
import { BaseInput } from "../BaseInput/BaseInput"

export interface AutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
  "aria-label": string
  as?: ElementType
  message?: ReactNode
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  /** A list of valid autocomplete options */
  options: string[]
  placeholder: string
  /** Default: "neutral" */
  status?: Status
  value?: string
  wrapperStyles?: CSSProperties
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ message, options, status, wrapperStyles, ...props }, ref) => {
    const theme = useTheme()
    const id = useId()

    return (
      <>
        <Wrapper style={wrapperStyles}>
          <StyledBaseInput list={id} icon={getStatusIcon(theme, status)} {...props} ref={ref} />
          <datalist id={id}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
          <StyledIcon name="chevronDown" />
        </Wrapper>
        {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
      </>
    )
  },
)

type Status = "success" | "fail" | "neutral"

const Wrapper = styled.div`
  position: relative;
`

const StyledBaseInput = styled(BaseInput)`
  border-radius: ${({ theme }) => 3 * theme.spacer}px;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
`

const getStatusIcon = (theme: Theme, status?: Status): JSX.Element | null => {
  switch (status) {
    case "success":
      return <Icon name="checkmark" style={{ color: theme.colors.content.positive }} />
    case "fail":
      return <Icon name="warning" style={{ color: theme.colors.content.negative }} />
    default:
      return null
  }
}

const getMessageColor = (status: Status | undefined): ContentColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    default:
      return "secondary"
  }
}

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => theme.spacer}px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content.primary};
  width: ${({ theme }) => 3 * theme.spacer}px;
  text-align: center;
`
