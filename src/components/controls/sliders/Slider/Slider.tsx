import styled from "@emotion/styled"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { Group } from "../../../layout/Group/Group"

interface SliderProps {
  /** Accessible name. */
  "aria-label": string

  /** Default slider value when uncontrolled. */
  defaultValue?: Array<number>

  /** Slider label. */
  label?: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">

  /** Maximum possible value. Default is ´100´. */
  max?: number

  /** Minimum possible value. Default is `0`. */
  min?: number

  /** The name of the slider. */
  name?: string

  /** Event handler called when the value changes. */
  onValueChange?: (value: Array<number>) => void

  /** Event handler called when the value changes at the end of an interaction. */
  onValueCommit?: (value: Array<number>) => void

  /** The stepping interval. */
  step?: number

  /** Controlled slider value. Use together with `onValueChange`. */
  value?: Array<number>
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ "aria-label": ariaLabel, max = 100, min = 0, ...props }, ref) => {
    return (
      <Group alignItems="center" gap="sm">
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {"label" in props && <StyledLabel>{props.label}</StyledLabel>}
        <Root max={max} min={min} {...props} ref={ref}>
          <StartRange data-anatomy="start-range" />
          <Track data-anatomy="track">
            <InnerTrack>
              <Range />
            </InnerTrack>
          </Track>
          <OuterThumb aria-label={ariaLabel}>
            <InnerThumb data-anatomy="inner-thumb" />
          </OuterThumb>
        </Root>
      </Group>
    )
  },
)

const StyledLabel = styled.label``

const Root = styled(SliderPrimitive.Root)`
  flex-grow: 1;
  position: relative;
  display: flex;
  cursor: pointer;

  &:hover {
    [data-anatomy="track"] {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }

    [data-anatomy="inner-thumb"] {
      inline-size: ${({ theme }) => theme.spacingBase}rem;
      block-size: ${({ theme }) => 4 * theme.spacingBase}rem;
    }
  }

  &:has([role="slider"]:focus-visible) [data-anatomy="track"] {
    background: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`

const StartRange = styled.span`
  position: absolute;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.content.positive};
  border-start-start-radius: ${({ theme }) => theme.borderRadii.xl};
  border-end-start-radius: ${({ theme }) => theme.borderRadii.xl};
`

const Track = styled(SliderPrimitive.Track)`
  inline-size: 100%;
  padding-inline: ${({ theme }) => 3 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};
`

const InnerTrack = styled.span`
  display: block;
  block-size: 100%;
  position: relative;
`

const Range = styled(SliderPrimitive.Range)`
  position: absolute;
  inset-inline: ${({ theme }) => 3 * theme.spacingBase}rem;
  block-size: 100%;
  background: ${({ theme }) => theme.colors.content.positive};
`

const OuterThumb = styled(SliderPrimitive.Thumb)`
  background: ${({ theme }) => theme.colors.content.positive};
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus-visible {
    outline: none;

    [data-anatomy="inner-thumb"] {
      inline-size: ${({ theme }) => theme.spacingBase}rem;
      block-size: ${({ theme }) => 4 * theme.spacingBase}rem;
    }
  }
`

const InnerThumb = styled.span`
  block-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  transition-property: inline-size, block-size;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};
`
