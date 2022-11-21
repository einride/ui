import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useRef,
} from "react"
import { Segment } from "../Segment/Segment"
import { useSegmentState } from "./useSegmentsState"

interface SegmentsProps extends ComponentPropsWithoutRef<"div"> {
  /** Effective element used. */
  as?: ElementType

  /** The value of the segment that should be active when initially rendered. Use when you do not need to control the state of the tabs. */
  defaultValue?: number

  /** Event handler called when the open segment index changes. */
  onValueChange?: (value: number) => void

  /** What segments do show. */
  segments: Array<Segment>

  /** Controlled open segment index. */
  value?: number
}

export const Segments = forwardRef<HTMLDivElement, SegmentsProps>(
  ({ defaultValue, onValueChange, segments, value: valueProp, ...props }, ref) => {
    const { value, handleChange } = useSegmentState({
      value: valueProp,
      defaultValue,
      onChange: onValueChange,
    })
    const segmentRefs: HTMLButtonElement[] = []
    const contentRef = useRef<HTMLElement>(null)

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
      if (e.code === "ArrowLeft" && value > 0) {
        const newIndex = value - 1
        handleChange(newIndex)
        segmentRefs[newIndex].focus()
      } else if (e.code === "ArrowRight" && value < segments.length - 1) {
        const newIndex = value + 1
        handleChange(newIndex)
        segmentRefs[newIndex].focus()
      } else if (e.code === "ArrowDown") {
        contentRef.current?.focus()
      }
    }

    // const getSelectedSegmentContent = (): ReactNode => {
    //   if (openIndex && segments[openIndex]) return segments[openIndex].content
    //   return segments[selectedSegmentIndex].
    // }

    const handleClick = (index: number): void => {
      handleChange(index)
    }

    const selectedSegmentContent = segments[value].content

    return (
      <>
        <SegmentsWrapper role="tablist" {...props} ref={ref}>
          {segments.map((segment, index) => (
            <Segment
              type="button"
              onClick={() => handleClick(index)}
              onKeyDown={handleKeyDown}
              key={segment.id}
              tabIndex={index === value ? undefined : -1}
              aria-selected={index === value ? "true" : undefined}
              disabled={segment.isDisabled}
              ref={(element) => element && segmentRefs.push(element)}
            >
              {segment.text}
            </Segment>
          ))}
        </SegmentsWrapper>
        <Content ref={contentRef} tabIndex={-1}>
          {selectedSegmentContent}
        </Content>
      </>
    )
  },
)

interface Segment {
  content: ReactNode
  id: string
  isDisabled?: boolean
  text: string
}

const SegmentsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  text-align: center;
`

const Content = styled.section`
  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`
