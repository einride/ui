import styled from "@emotion/styled"
import { CalendarDate, createCalendar, DateValue } from "@internationalized/date"
import { useDateField, useDateSegment } from "@react-aria/datepicker"
import { useLocale } from "@react-aria/i18n"
import {
  DateFieldState,
  DateSegment as DateSegmentType,
  useDateFieldState,
} from "@react-stately/datepicker"
import { ComponentPropsWithoutRef, LabelHTMLAttributes, ReactNode, useId, useRef } from "react"
import { getBackground } from "../../../../lib/theme/prop-system"
import { BackgroundColor, Theme } from "../../../../lib/theme/types"
import { Box } from "../../../layout/Box/Box"

export interface DateInputBaseProps {
  /** Background color of the input field. Default is `secondary`. */
  background?: BackgroundColor

  /** Default calendar value when uncontrolled. */
  defaultValue?: CalendarDate

  /** Controlled calendar value. */
  value?: CalendarDate

  /** Event handler called when the value of the calendar changes. */
  onChange?: (value: CalendarDate) => void

  /** Props passed to root element. */
  wrapperProps?: Omit<ComponentPropsWithoutRef<"div">, "color">
}

interface DateInputWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

interface DateInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type DateInputProps = DateInputBaseProps & (DateInputWithLabelProps | DateInputWithoutLabelProps)

export const DateInput = ({ wrapperProps, ...props }: DateInputProps): JSX.Element => {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    onChange: props.onChange as (value: DateValue) => void,
    locale,
    createCalendar,
  })
  const ref = useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useDateField(props, state, ref)
  const id = useId()
  return (
    <Box display="inline-block" {...wrapperProps}>
      {"label" in props && (
        <StyledLabel {...props.labelProps} {...labelProps} htmlFor={id}>
          {props.label}
        </StyledLabel>
      )}
      <Field display="flex" hasLabel={"label" in props} {...fieldProps} ref={ref}>
        {state.segments.map((segment, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DateSegment key={index} segment={segment} state={state} />
        ))}
      </Field>
    </Box>
  )
}

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

interface StyledInputProps {
  background?: BackgroundColor
  hasLabel: boolean
}

const Field = styled(Box)<StyledInputProps>`
  line-height: calc(4 / 3);
  background: ${({ background, theme }) =>
    background ? getBackground(background, theme) : theme.colors.background.secondary};
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

  &:focus-within {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ background, theme }) =>
      background ? getHoverBackground(background, theme) : theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }
`

const getHoverBackground = (background: BackgroundColor, theme: Theme): string => {
  switch (background) {
    case "secondary":
      return theme.colors.background.tertiary
    case "secondaryOpacity":
      return theme.colors.background.tertiaryOpacity
    default:
      return theme.colors.background.tertiary
  }
}

interface DateSegmentProps {
  segment: DateSegmentType
  state: DateFieldState
}

export const DateSegment = ({ segment, state }: DateSegmentProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <Segment {...segmentProps} ref={ref}>
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <Placeholder aria-hidden="true" isPlaceholder={segment.isPlaceholder}>
        {segment.placeholder}
      </Placeholder>
      {segment.isPlaceholder ? "" : segment.text}
    </Segment>
  )
}

const Segment = styled.div`
  text-align: end;

  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.background.primaryInverted};
    color: ${({ theme }) => theme.colors.content.primaryInverted};
    border-radius: ${({ theme }) => theme.borderRadii.xs};
  }
`

interface PlaceholderProps {
  isPlaceholder?: boolean
}

const Placeholder = styled.span<PlaceholderProps>`
  visibility: ${({ isPlaceholder }) => !isPlaceholder && "hidden"};
  height: ${({ isPlaceholder }) => !isPlaceholder && 0};
  pointer-events: none;
  display: block;
`
