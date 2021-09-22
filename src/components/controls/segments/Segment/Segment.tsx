import * as React from "react"
import { ReactNode } from "react"

export interface SegmentProps {
  id: string
  text: string
  content: ReactNode
}

export const Segment = ({ id, text, content }: SegmentProps) => {
  return (
    <div>
      {id} {text} {content}
    </div>
  )
}
