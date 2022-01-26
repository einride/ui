import * as React from "react"
import { HTMLAttributes } from "react"

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name:
    | "checkmark"
    | "warning"
    | "chevronDown"
    | "chevronUp"
    | "chevronRight"
    | "chevronLeft"
    | "xMark"
    | "arrowUp"
    | "arrowDown"
    | "arrowRightwards"
    | "arrowLeftwards"
    | "arrowUpCircle"
    | "arrowDownCircle"
    | "bolt"
    | "loupe"
}

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case "checkmark":
      return <span {...props}>&#10003;</span>
    case "warning":
      return <span {...props}>&#9888;</span>
    case "chevronDown":
      return <span {...props}>&#8964;</span>
    case "chevronUp":
      return <span {...props}>&#8963;</span>
    case "chevronRight":
      return <span {...props}>&#707;</span>
    case "chevronLeft":
      return <span {...props}>&#706;</span>
    case "xMark":
      return <span {...props}>&#10060;</span>
    case "arrowUp":
      return <span {...props}>&#8593;</span>
    case "arrowDown":
      return <span {...props}>&#8595;</span>
    case "arrowRightwards":
      return <span {...props}>&#8594;</span>
    case "arrowLeftwards":
      return <span {...props}>&#8592;</span>
    case "arrowUpCircle":
      return <span {...props}>&#1048694;</span>
    case "arrowDownCircle":
      return <span {...props}>&#1048696;</span>
    case "bolt":
      return <span {...props}>&#128498;</span>
    case "loupe":
      return <span {...props}>&#1049259;</span>
    default:
      return null
  }
}
