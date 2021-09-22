import styled from "@emotion/styled"
import * as React from "react"
import { Fragment, useState } from "react"
import { SegmentProps } from "../Segment"

const SegmentsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  text-align: center;
`

const SegmentWrapper = styled.button<{ selected: boolean }>`
  padding-top: ${({ theme }) => theme.spacer + 1}px;
  padding-bottom: ${({ theme }) => 2 * theme.spacer - 1}px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.content.primary : theme.colors.content.secondary};
  border-bottom: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.border.selected : theme.colors.border.primary};
`

const StyledParagraph2 = styled(Paragraph)<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.content.primary : theme.colors.content.secondary};
  margin: 0;
`



export interface SegmentsProps {
  segments: SegmentProps[]
}

export const Segments = ({ segments }: SegmentsProps) => {
  const firstSegmentId = segments?.[0].id
  const [selectedSegmentId, setSelectedSegmentId] =
    useState<string>(firstSegmentId)

  return (
    <>
      <SegmentsWrapper>
        {segments.map((segment) => (
          <Fragment key={segment.id}>
            <SegmentWrapper
              type="button"
              selected={selectedSegmentId === segment.id}
              onClick={() => setSelectedSegmentId(segment.id)}
            >
                {segment.text}
            </SegmentWrapper>
          </Fragment>
        ))}
      </SegmentsWrapper>
      {segments[]}
    </>
  )
}
