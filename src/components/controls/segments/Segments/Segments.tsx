import styled from "@emotion/styled"
import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
} from "react"
import { Segment } from "../Segment/Segment"

export interface SegmentsProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  segments: {
    content: ReactNode
    id: string
    isDisabled?: boolean
    text: string
  }[]
}

export const Segments = forwardRef<HTMLDivElement, SegmentsProps>(({ segments, ...props }, ref) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0)
  const segmentRefs: HTMLButtonElement[] = []
  const contentRef = useRef<HTMLElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.code === "ArrowLeft" && selectedSegmentIndex > 0) {
      const newIndex = selectedSegmentIndex - 1
      setSelectedSegmentIndex(newIndex)
      segmentRefs[newIndex].focus()
    } else if (e.code === "ArrowRight" && selectedSegmentIndex < segments.length - 1) {
      const newIndex = selectedSegmentIndex + 1
      setSelectedSegmentIndex(newIndex)
      segmentRefs[newIndex].focus()
    } else if (e.code === "ArrowDown") {
      contentRef.current?.focus()
    }
  }

  const selectedSegmentContent = segments[selectedSegmentIndex].content

  return (
    <>
      <SegmentsWrapper role="tablist" {...props} ref={ref}>
        {segments.map((segment, index) => (
          <Segment
            type="button"
            onClick={() => setSelectedSegmentIndex(index)}
            onKeyDown={handleKeyDown}
            key={segment.id}
            tabIndex={index === selectedSegmentIndex ? undefined : -1}
            aria-selected={index === selectedSegmentIndex ? "true" : undefined}
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
})

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
