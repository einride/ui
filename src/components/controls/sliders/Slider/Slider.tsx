import styled from "@emotion/styled"
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react"

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: number
}

export const Slider = ({ value = 0, ...props }: SliderProps): JSX.Element => {
  const [percentage, setPercentage] = useState(value)
  const sliderWrapperRef = useRef<HTMLDivElement>(null)

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPercentage(parseInt(e.target.value, 10))
  }

  return (
    <Wrapper ref={sliderWrapperRef}>
      <LeftCircle />
      <SliderFill percentage={percentage} />
      <Range
        type="range"
        value={percentage}
        onChange={handleSliderChange}
        percentage={percentage}
        {...props}
      />
      <ThumbWrapper>
        <Thumb percentage={percentage} />
      </ThumbWrapper>
    </Wrapper>
  )
}

const Wrapper = styled("div", { target: "slider-wrapper" })`
  height: ${({ theme }) => 6 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
  position: relative;
`
const LeftCircle = styled.div`
  height: 100%;
  width: 20px;
  background: ${({ theme }) => theme.colors.content.positive};
  border-top-left-radius: ${({ theme }) => 3 * theme.spacer}px;
  border-bottom-left-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const SliderFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background: ${({ theme }) => theme.colors.content.positive};
  border-top-left-radius: ${({ theme }) => 3 * theme.spacer}px;
  border-bottom-left-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const Range = styled.input<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  height: ${({ theme }) => 6 * theme.spacer}px;

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
    background: ${({ theme }) => theme.colors.content.positive};
    border-radius: ${({ theme }) => theme.spacer * 3}px;
    height: 100%;
    width: ${({ theme }) => theme.spacer * 6}px;
  }
  &::-moz-range-thumb {
    border: none;
    background: ${({ theme }) => theme.colors.content.positive};
    border-radius: ${({ theme }) => theme.spacer * 3}px;
    height: 100%;
    width: ${({ theme }) => theme.spacer * 6}px;
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

const Thumb = styled.div<{ percentage: number }>`
  width: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  position: absolute;
  background: ${({ theme }) => theme.colors.background.primary};
  left: ${({ percentage }) => `${percentage}%`};
  pointer-events: none;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph};
  transition-property: width, height, margin;

  ${Wrapper}:hover & {
    width: ${({ theme }) => theme.spacer}px;
    height: ${({ theme }) => 4 * theme.spacer}px;
    margin-left: ${({ theme }) => 0.5 * theme.spacer}px;
  }
`
