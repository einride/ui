import styled from "@emotion/styled"
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react"

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange?: (value: number) => void
  value?: number
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ onInputChange, value = 0, ...props }, ref) => {
    const [hasFocus, setHasFocus] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = parseInt(e.target.value, 10)
      onInputChange?.(newValue)
    }

    return (
      <Wrapper>
        <LeftFill disabled={!!props.disabled} />
        <FillWrapper>
          <Fill disabled={!!props.disabled} percentage={value} />
        </FillWrapper>
        <Range
          type="range"
          onChange={handleChange}
          value={value}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        <ThumbWrapper>
          <Thumb disabled={!!props.disabled} hasFocus={hasFocus} percentage={value} />
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
      disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
    border-radius: ${({ theme }) => theme.borderRadii.xl};
    width: ${({ theme }) => 6 * theme.spacer}px;
    height: 100%;
  }
  &::-moz-range-thumb {
    border: none;
    background: ${({ disabled, theme }) =>
      disabled ? theme.colors.content.tertiary : theme.colors.content.positive};
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
