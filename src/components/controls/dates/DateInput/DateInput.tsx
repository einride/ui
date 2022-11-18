import styled from "@emotion/styled"
import { createCalendar } from "@internationalized/date"
import { useDateField } from "@react-aria/datepicker"
import { useLocale } from "@react-aria/i18n"
import { DateSegment as DateSegmentType, useDateFieldState } from "@react-stately/datepicker"
import { ComponentPropsWithoutRef, LabelHTMLAttributes, ReactNode, useId, useRef } from "react"
import { getBackground } from "../../../../lib/theme/prop-system"
import { BackgroundColor, Theme } from "../../../../lib/theme/types"
import { Box } from "../../../layout/Box/Box"

export interface DateInputBaseProps {
  /** Background color of the input field. Default is `secondary`. */
  background?: BackgroundColor

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
    locale,
    createCalendar,
  })
  const ref = useRef<HTMLDivElement>(null)
  const { labelProps } = useDateField(props, state, ref)
  const id = useId()

  return (
    <Box display="inline-block" {...wrapperProps}>
      {"label" in props && (
        <StyledLabel {...props.labelProps} {...labelProps} htmlFor={id}>
          {props.label}
        </StyledLabel>
      )}
      <Field display="flex" hasLabel={"label" in props} ref={ref}>
        {state.segments.map((segment, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DateSegment key={index} segment={segment} />
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
}

export const DateSegment = ({ segment }: DateSegmentProps): JSX.Element => {
  return (
    <Box>
      {segment.isPlaceholder ? (
        <Box as="span" aria-hidden="true">
          {segment.placeholder}
        </Box>
      ) : (
        <Box as="span">{segment.text}</Box>
      )}
    </Box>
  )
}
