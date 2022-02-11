import styled from "@emotion/styled"
import { Fragment, ReactNode, useState } from "react"
import { Segment } from "../Segment/Segment"

const SegmentsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  text-align: center;
`

export interface SegmentsProps {
  segments: {
    id: string
    content: ReactNode
    text: string
  }[]
}

export const Segments = ({ segments }: SegmentsProps) => {
  const firstSegmentId = segments[0].id
  const [selectedSegmentId, setSelectedSegmentId] =
    useState<string>(firstSegmentId)
  const selectedSegmentContent = segments.filter(
    (segment) => segment.id === selectedSegmentId,
  )[0].content
  return (
    <>
      <SegmentsWrapper>
        {segments.map((segment) => (
          <Fragment key={segment.id}>
            <Segment
              type="button"
              selected={selectedSegmentId === segment.id}
              onClick={() => setSelectedSegmentId(segment.id)}
            >
              {segment.text}
            </Segment>
          </Fragment>
        ))}
      </SegmentsWrapper>
      {selectedSegmentContent}
    </>
  )
}
