import styled from "@emotion/styled"
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState, useEffect } from "react"

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
  height: ${({ theme }) => 6 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  position: relative;
`

const LeftFill = styled.div<{ disabled: boolean }>`
  position: absolute;
  height: 100%;
  width: ${({ theme }) => 3 * theme.spacer}px;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
  border-top-left-radius: ${({ theme }) => 3 * theme.spacer}px;
  border-bottom-left-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const FillWrapper = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  right: ${({ theme }) => 3 * theme.spacer}px;
  left: ${({ theme }) => 3 * theme.spacer}px;
`

const Fill = styled.div<{ disabled: boolean; percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
`

const Range = styled.input<{ disabled?: boolean | undefined }>`
  position: absolute;
  top: 0;
  appearance: none;
  background: transparent;
  ${({ disabled }) => !disabled && "cursor: pointer"};
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    height: ${({ theme }) => 6 * theme.spacer}px;
  }
  &::-moz-range-track {
    height: ${({ theme }) => 6 * theme.spacer}px;
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
    width: ${({ theme }) => 6 * theme.spacer}px;
    height: 100%;
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
    width: ${({ theme }) => 6 * theme.spacer}px;
    height: 100%;
  }
`

const ThumbWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${({ theme }) => 2 * theme.spacer}px;
  width: ${({ theme }) => `calc(100% - ${6 * theme.spacer}px)`};
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Thumb = styled.div<{
  disabled: boolean
  hasFocus: boolean
  percentage: number
}>`
  width: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 2 * theme.spacer}px;
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
    width: ${theme.spacer}px;
    height: ${4 * theme.spacer}px;
    margin-left: ${0.5 * theme.spacer}px;
  `};

  ${({ disabled, theme }) =>
    !disabled &&
    `
  ${Wrapper}:hover & {
    width: ${theme.spacer}px;
    height: ${4 * theme.spacer}px;
    margin-left: ${0.5 * theme.spacer}px;
  }
`}
`
