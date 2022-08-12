import styled from "@emotion/styled"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  useId,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"

export interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Effective element used. */
  as?: ElementType

  /** Options to render in select list. */
  children: ReactNode

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /**  Default is `neutral`. */
  status?: Status

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

interface SelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

interface SelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type SelectProps = SelectBaseProps & (SelectWithLabelProps | SelectWithoutLabelProps)

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, message, placeholder, status, wrapperProps, ...props }, ref) => {
    const id = useId()

    return (
      <Wrapper {...wrapperProps}>
        {"label" in props && (
          <StyledLabel {...props.labelProps} htmlFor={id}>
            {props.label}
          </StyledLabel>
        )}
        <SelectWrapper>
          <StyledSelect {...props} hasLabel={"label" in props} id={id} ref={ref}>
            {placeholder && <option value="">{placeholder}</option>}
            {children}
          </StyledSelect>
          <StyledIcon name="chevronDown" />
        </SelectWrapper>
        {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
      </Wrapper>
    )
  },
)

type Status = "success" | "fail" | "neutral"

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

const Wrapper = styled.div``

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-top: 5px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const SelectWrapper = styled.div`
  position: relative;
`

const StyledSelect = styled.select<{ hasLabel: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  width: 100%;
  display: block;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
  padding-right: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  cursor: pointer;
  appearance: none;

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  right: ${({ theme }) => theme.spacer}px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.content.primary};
  width: ${({ theme }) => 3 * theme.spacer}px;
  text-align: center;
`
