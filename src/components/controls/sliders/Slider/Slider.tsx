import styled from "@emotion/styled"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { InputHTMLAttributes, useEffect, useRef, useState } from "react"

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: number
}

export const Slider = ({ value = 100, ...props }: SliderProps): JSX.Element => {
  const [percentage, setPercentage] = useState(value)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const handleX = useMotionValue(value)
  const progress = useTransform(handleX, (x) => x + 48 / 2)
  const background = useMotionTemplate`linear-gradient(90deg, #374151 ${progress}px, #d1d5db 0)`

  useEffect(() => {
    if (!progressRef.current) return
    const newProgess = percentage / 100
    const progressBounds = progressRef.current.getBoundingClientRect()
    handleX.set(newProgess * progressBounds.width)
  }, [handleX, percentage])

  const handleDrag = (): void => {
    if (!handleRef.current || !progressRef.current) return
    const handleBounds = handleRef.current.getBoundingClientRect()
    const middleOfHandle = handleBounds.x + handleBounds.width / 2
    const progressBounds = progressRef.current.getBoundingClientRect()
    const newPercentage =
      (middleOfHandle - progressBounds.x) / progressBounds.width
    setPercentage(newPercentage)
  }

  return (
    <Wrapper
      style={{ background }}
      onPointerDown={(event) => {
        if (!progressRef.current) return
        const { left, width } = progressRef.current.getBoundingClientRect()
        const position = event.pageX - left
        const newProgress = position / width
        const newValue = newProgress * 100
        setPercentage(clamp(newValue))
      }}
    >
      <Progress ref={progressRef} />
      <div ref={constraintsRef}>
        <Handle
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          ref={handleRef}
          style={{ x: handleX }}
        />
      </div>
      <div style={{ paddingTop: 100 }}>{percentage}</div>
    </Wrapper>
  )
}

const clamp = (number: number): number => {
  return Math.max(0, Math.min(number, 100))
}

const Wrapper = styled(motion.div)`
  height: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
  position: relative;
`

const Progress = styled(motion.div)`
  position: absolute;
  height: ${({ theme }) => 6 * theme.spacer}px;
  left: ${({ theme }) => 3 * theme.spacer}px;
  right: ${({ theme }) => 3 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const Handle = styled(motion.div)`
  position: absolute;
  background: ${({ theme }) => theme.colors.content.positive};
  width: ${({ theme }) => 6 * theme.spacer}px;
  height: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`
