import styled from "@emotion/styled"
import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect, useState } from "react"

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Maximum possible value. Default is ´100´. */
  max?: number

  /** Minimum possible value. Default is `0`. */
  min?: number

  /** Called each time value changes. */
  onInputChange?: (value: number) => void

  /** Called when user stops dragging slider. */
  onInputChangeEnd?: (value: number) => void

  /** Current value for controlled slider. */
  value?: number
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ max = 100, min = 0, onInputChange, onInputChangeEnd, value = 0, ...props }, ref) => {
    const [hasFocus, setHasFocus] = useState(false)
    const [internalValue, setInternalValue] = useState(value)

    useEffect(() => {
      setInternalValue(value)
    }, [value])

    const currentValue = (): number => {
      // make sure we keep our value within the min and max range of the slider
      if (internalValue <= min) return min
      if (internalValue >= max) return max
      return internalValue
    }

    const calculatedPercentage = (): number => ((currentValue() - min) / (max - min)) * 100

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = parseInt(e.target.value, 10)
      setInternalValue(newValue)
      onInputChange?.(newValue)
    }

    const handleChangeEnd = (): void => {
      onInputChangeEnd?.(internalValue)
    }

    return (
      <Wrapper>
        <LeftFill disabled={!!props.disabled} />
        <FillWrapper>
          <Fill disabled={!!props.disabled} percentage={calculatedPercentage()} />
        </FillWrapper>
        <Range
          type="range"
          max={max}
          min={min}
          onChange={handleChange}
          onMouseUp={handleChangeEnd}
          onTouchEnd={handleChangeEnd}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          value={currentValue()}
          {...props}
          ref={ref}
        />
        <ThumbWrapper>
          <Thumb
            disabled={!!props.disabled}
            hasFocus={hasFocus}
            percentage={calculatedPercentage()}
          />
        </ThumbWrapper>
      </Wrapper>
    )
  },
)

const Wrapper = styled("div", { target: "wrapper" })`
  block-size: ${({ theme }) => 6 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  position: relative;
`

const LeftFill = styled.div<{ disabled: boolean }>`
  position: absolute;
  block-size: 100%;
  inline-size: ${({ theme }) => 3 * theme.spacer}px;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
  border-start-start-radius: ${({ theme }) => 3 * theme.spacer}px;
  border-end-start-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const FillWrapper = styled.div`
  position: absolute;
  block-size: 100%;
  inset-block-start: 0;
  inset-inline: ${({ theme }) => 3 * theme.spacer}px;
`

const Fill = styled.div<{ disabled: boolean; percentage: number }>`
  block-size: 100%;
  inline-size: ${({ percentage }) => percentage}%;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
`

const Range = styled.input<{ disabled?: boolean | undefined }>`
  position: absolute;
  inset-block-start: 0;
  appearance: none;
  background: transparent;
  ${({ disabled }) => !disabled && "cursor: pointer"};
  inline-size: 100%;
  block-size: 100%;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    block-size: ${({ theme }) => 6 * theme.spacer}px;
  }
  &::-moz-range-track {
    block-size: ${({ theme }) => 6 * theme.spacer}px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    box-shadow: none;
    background: ${({ disabled, theme }) =>
      // Since tertiary has an opacity and the same color doesn't exist in backgrounds,
      // we need to use a gradient with half of the thumb transparent in disabled state.
      disabled
        ? `linear-gradient(90deg, transparent 0%, transparent 50%, ${theme.colors.content.tertiary} 50%, ${theme.colors.content.tertiary} 100%)`
        : theme.colors.content.positive};
    border-radius: ${({ theme }) => theme.borderRadii.xl};
    inline-size: ${({ theme }) => 6 * theme.spacer}px;
    block-size: 100%;
  }
  &::-moz-range-thumb {
    border: none;
    background: ${({ disabled, theme }) =>
      // Since tertiary has an opacity and the same color doesn't exist in backgrounds,
      // we need to use a gradient with half of the thumb transparent in disabled state.
      disabled
        ? `linear-gradient(90deg, transparent 0%, transparent 50%, ${theme.colors.content.tertiary} 50%, ${theme.colors.content.tertiary} 100%)`
        : theme.colors.content.positive};
    border-radius: ${({ theme }) => theme.borderRadii.xl};
    inline-size: ${({ theme }) => 6 * theme.spacer}px;
    block-size: 100%;
  }
`

const ThumbWrapper = styled.div`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: ${({ theme }) => 2 * theme.spacer}px;
  inline-size: ${({ theme }) => `calc(100% - ${6 * theme.spacer}px)`};
  block-size: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Thumb = styled.div<{
  disabled: boolean
  hasFocus: boolean
  percentage: number
}>`
  inline-size: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  position: absolute;
  background: ${({ theme }) => theme.colors.background.primary};
  left: ${({ percentage }) => `${percentage}%`};
  pointer-events: none;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
  transition-property: width, height, margin;

  ${({ disabled, hasFocus, theme }) =>
    hasFocus &&
    !disabled &&
    `
    inline-size: ${theme.spacer}px;
    block-size: ${4 * theme.spacer}px;
    margin-inline-start: ${0.5 * theme.spacer}px;
  `};

  ${({ disabled, theme }) =>
    !disabled &&
    `
  ${Wrapper}:hover & {
    inline-size: ${theme.spacer}px;
    block-size: ${4 * theme.spacer}px;
    margin-inline-start: ${0.5 * theme.spacer}px;
  }
`}
`
