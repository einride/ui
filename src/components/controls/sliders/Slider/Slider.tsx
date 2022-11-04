import styled from "@emotion/styled"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { forwardRef } from "react"

interface SliderProps {
  /** Default slider value when uncontrolled. */
  defaultValue?: Array<number>

  /** When true, prevents the user from interacting with the slider. */
  disabled?: boolean

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
  ({ max = 100, min = 0, ...props }, ref) => {
    return (
      <Root max={max} min={min} {...props} ref={ref}>
        <StartRange data-anatomy="start-range" />
        <Track>
          <InnerTrack>
            <Range />
          </InnerTrack>
        </Track>
        <OuterThumb>
          <InnerThumb data-anatomy="inner-thumb" />
        </OuterThumb>
      </Root>
    )
  },
)

const Root = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  cursor: pointer;

  :is(:hover, :focus-visible):not([data-disabled]) [data-anatomy="inner-thumb"] {
    inline-size: ${({ theme }) => theme.spacingBase}rem;
    block-size: ${({ theme }) => 4 * theme.spacingBase}rem;
  }

  &[data-disabled] {
    cursor: not-allowed;

    [data-anatomy="start-range"] {
      background: ${({ theme }) => theme.colors.content.tertiary};
    }
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
  block-size: ${({ theme }) => 6 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`

const InnerTrack = styled.span`
  display: block;
  block-size: 100%;
  position: relative;
`

const Range = styled(SliderPrimitive.Range)`
  position: absolute;
  inset-inline: 24px;
  block-size: 100%;
  background: ${({ theme }) => theme.colors.content.positive};

  &[data-disabled] {
    background: ${({ theme }) => theme.colors.content.tertiary};
  }
`

const OuterThumb = styled(SliderPrimitive.Thumb)`
  background: ${({ theme }) => theme.colors.content.positive};
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  display: flex;
  justify-content: center;
  align-items: center;

  &[data-disabled] {
    background: ${({ theme }) =>
      `linear-gradient(90deg, transparent 0%, transparent 50%, ${theme.colors.content.tertiary} 50%, ${theme.colors.content.tertiary} 100%)`};
  }

  :focus-visible {
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
