import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, useCallback, useState } from "react"
import { Color } from "../../../lib/theme/props"
import { PointerIcon } from "./PointerIcon"
import { StepGaugeStep } from "./StepGaugeStep"

export interface StepGaugeProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Accessible name. Describes what information the progress is conveying. */
  "aria-label": string

  /** Color of the completed gauge stroke. Default is `positive`. */
  color?: Color

  /** Number of completed steps. */
  completedSteps: number

  /** Number of steps. Default is `3`. */
  steps?: number
}

/** A step gauge that can be used for conveying status. */
export const StepGauge = forwardRef<HTMLDivElement, StepGaugeProps>(
  ({ color = "positive", completedSteps, steps = DEFAULT_STEPS, ...props }, forwardedRef) => {
    const [svgHeight, setSvgHeight] = useState(0)
    const [pointerHeight, setPointerHeight] = useState(0)
    const svgRef = useCallback((node: SVGSVGElement | null) => {
      setSvgHeight(node ? node.clientHeight : 0)
    }, [])
    const pointerRef = useCallback((node: SVGSVGElement | null) => {
      setPointerHeight(node ? node.viewBox.baseVal.height : 0)
    }, [])
    return (
      <Wrapper
        {...props}
        ref={forwardedRef}
        role="progressbar"
        aria-valuemax={steps}
        aria-valuemin={0}
        aria-valuenow={completedSteps}
        aria-valuetext={`${completedSteps} of ${steps} steps completed`}
      >
        <StyledSvg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} ref={svgRef}>
          {[...Array(steps).keys()].map((step) => (
            <StepGaugeStep
              color={color}
              completedSteps={completedSteps}
              index={step}
              key={step}
              steps={steps}
              svgSize={SVG_SIZE}
            />
          ))}
        </StyledSvg>
        <StyledPointerIcon
          completedSteps={completedSteps}
          pointerHeight={pointerHeight}
          svgHeight={svgHeight}
          steps={steps}
          ref={pointerRef}
        />
      </Wrapper>
    )
  },
)

export const DEFAULT_STEPS = 3
const SVG_SIZE = 106

const Wrapper = styled.div`
  position: relative;
  inline-size: ${({ theme }) => 7 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSvg = styled.svg`
  stroke-width: ${({ theme }) => 0.375 * theme.spacingBase}rem;
  inline-size: 100%;
`

interface StyledPointerIconProps {
  completedSteps: number
  steps: number
  pointerHeight: number
  svgHeight: number
}

const StyledPointerIcon = styled(PointerIcon, {
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledPointerIconProps>`
  block-size: ${({ pointerHeight, svgHeight }) => `${(pointerHeight / svgHeight) * 100}%`};
  inline-size: auto;
  transform: rotateZ(${({ completedSteps, steps }) => getPointerRotation(completedSteps, steps)}deg)
    translateY(-22%);
  transition-property: transform;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
  fill: ${({ theme }) => theme.colors.content.primary};
  position: absolute;
`

const getPointerRotation = (completedSteps: number, steps: number): number => {
  if (completedSteps >= steps) return 360 - 7 // to point to the end of the
  if (completedSteps <= 0) return 0
  return (360 / steps) * completedSteps - 7 // to point to the end of the filled step
}
