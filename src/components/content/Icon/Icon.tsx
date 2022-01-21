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
    | "bolt"
    | "search"
}

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case "checkmark":
      return <span {...props}>✓</span>
    case "warning":
      return <span {...props}>⚠︎</span>
    case "chevronDown":
      return <span {...props}>⌄</span>
    case "chevronUp":
      return <span {...props}>⌃</span>
    case "chevronRight":
      return <span {...props}>˃</span>
    case "chevronLeft":
      return <span {...props}>˂</span>
    case "xMark":
      return <span {...props}>❌</span>
    case "arrowUp":
      return <span {...props}>↑</span>
    case "arrowDown":
      return <span {...props}>↓</span>
    case "arrowRightwards":
      return <span {...props}>→</span>
    case "arrowLeftwards":
      return <span {...props}>←</span>
    case "bolt":
      return <span {...props}>🗲</span>
    case "search":
      return <span {...props}>􀊫</span>
    default:
      return null
  }
}
