import { Box, Icon } from "@einride/ui"
import { Global, css, useTheme } from "@emotion/react"

import styled from "@emotion/styled"
import React, { ComponentPropsWithoutRef } from "react"
import { DayPicker, DayPickerSingleProps, SelectSingleEventHandler } from "react-day-picker"
import "react-day-picker/dist/style.css"

export interface DatePickerProps {
  /** The earliest day to start the month navigation. */
  fromDate?: Date

  /** The latest day to end the month navigation. */
  toDate?: Date

  /** The selected day. */
  selected?: Date | undefined

  /** Event fired when a day is selected. */
  onSelect?: SelectSingleEventHandler

  /** Props passed to root element. */
  wrapperProps?: ComponentPropsWithoutRef<typeof Box>
}

const IconArrowLeft = (): React.JSX.Element => {
  return <Icon name="arrowLeft" />
}

const IconArrowRight = (): React.JSX.Element => {
  return <Icon name="arrowRight" />
}

export const DatePicker = ({ wrapperProps, ...props }: DatePickerProps): React.JSX.Element => {
  const theme = useTheme()

  const datePickerProps: DayPickerSingleProps = {
    mode: "single",
    ...props,
  }

  if (props.selected) {
    datePickerProps.defaultMonth = props.selected
  }

  return (
    <Box {...wrapperProps}>
      <Global
        styles={css`
          .rdp {
            --rdp-cell-size: ${5 * theme.spacingBase}rem; /* Size of the day cells. */
            --rdp-caption-font-size: inherit; /* Font size for the caption labels. */
            --rdp-accent-color: ${theme.colors.background
              .primaryInverted}; /* Accent color for the background of selected days. */
            --rdp-background-color: ${theme.colors.background
              .tertiary}; /* Background color for the hovered/focused elements. */
            --rdp-accent-color-dark: ${theme.colors.background
              .primaryInverted}; /* Accent color for the background of selected days (to use in dark-mode). */
            --rdp-background-color-dark: ${theme.colors.background
              .tertiary}; /* Background color for the hovered/focused elements (to use in dark-mode). */
            --rdp-outline: 1px solid var(--rdp-accent-color); /* Outline border for focused elements */
            --rdp-outline-selected: 1px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
            --rdp-selected-color: ${theme.colors.content
              .primaryInverted}; /* Color of selected day text */
            margin: 0;
          }
        `}
      />
      <NewStyledCalender
        ISOWeek
        components={{
          IconLeft: IconArrowLeft,
          IconRight: IconArrowRight,
        }}
        {...datePickerProps}
      />
    </Box>
  )
}

const NewStyledCalender = styled(DayPicker)`
  .rdp-table {
    border-collapse: separate;
    border-spacing: ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-month {
    background: ${({ theme }) => theme.colors.background.secondaryElevated};
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-caption {
    margin-bottom: ${({ theme }) => 2 * theme.spacingBase}rem;
  }

  .rdp-caption_label {
    font-weight: normal;
  }

  .rdp-button {
    &:focus-visible {
      text-decoration: underline;
    }
  }

  .rdp-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-nav_button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.buttons.background.tertiary};
    color: ${({ theme }) => theme.colors.content.primary};
    border-radius: ${({ theme }) => theme.borderRadii.full};
    block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;

    &:hover {
      background: ${({ theme }) => theme.colors.buttons.background.hover.tertiary};
    }

    &:focus-visible {
      text-decoration: none;
    }
  }

  .rdp-head_cell {
    color: ${({ theme }) => theme.colors.content.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    font-size: inherit;
    text-transform: none;
  }

  .rdp-cell {
    width: auto;
    height: auto;
  }

  .rdp-day {
    border-radius: ${({ theme }) => theme.borderRadii.sm};
    width: ${({ theme }) => 4 * theme.spacingBase}rem;
    height: ${({ theme }) => 5 * theme.spacingBase}rem;
    max-width: none;
  }

  .rdp-day_selected {
    &:focus-visible {
      outline-offset: 0;
      background-color: var(--rdp-accent-color);
      color: var(--rdp-selected-color);
    }
  }

  .rdp-day_today {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.content.positive};
    text-decoration: underline;
  }
`
