import styled from "@emotion/styled"
import { createCalendar } from "@internationalized/date"
import { AriaButtonProps, useButton } from "@react-aria/button"
import { useLocale } from "@react-aria/i18n"
import { DateSegment as DateSegmentType, useDateFieldState } from "@react-stately/datepicker"

import { useRef } from "react"
import { getBackground } from "../../../../lib/theme/prop-system"
import { BackgroundColor, Theme } from "../../../../lib/theme/types"
import { Box } from "../../../layout/Box/Box"

export interface DateInputProps {
  buttonProps: AriaButtonProps<"button">

  /** Background color of the input field. Default is `secondary`. */
  background?: BackgroundColor

  hasLabel: boolean
}

export const DateInput = ({ buttonProps, hasLabel, ...props }: DateInputProps): JSX.Element => {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps: bProps } = useButton(buttonProps, ref)
  return (
    <Box display="inline-block">
      <Field tabIndex={0} hasLabel={hasLabel} ref={ref} {...bProps} {...props}>
        {state.segments.map((segment, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DateSegment key={index} segment={segment} />
        ))}
      </Field>
    </Box>
  )
}

interface StyledInputProps {
  background?: BackgroundColor
  hasLabel: boolean
}

const Field = styled.button<StyledInputProps>`
  display: flex;
  line-height: calc(4 / 3);
  background: ${({ background, theme }) =>
    background ? getBackground(background, theme) : theme.colors.background.secondary};
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};
  cursor: pointer;

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
