import * as React from "react"
import { HTMLAttributes } from "react"

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: Name
}

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case "checkmark":
      return (
        <span aria-hidden="true" {...props}>
          &#10003;
        </span>
      )
    case "warning":
      return (
        <span aria-hidden="true" {...props}>
          &#1049087;
        </span>
      )
    case "chevronDown":
      return (
        <span aria-hidden="true" {...props}>
          &#8964;
        </span>
      )
    case "chevronUp":
      return (
        <span aria-hidden="true" {...props}>
          &#8963;
        </span>
      )
    case "chevronRight":
      return (
        <span aria-hidden="true" {...props}>
          &#707;
        </span>
      )
    case "chevronLeft":
      return (
        <span aria-hidden="true" {...props}>
          &#706;
        </span>
      )
    case "xMark":
      return (
        <span aria-hidden="true" {...props}>
          &#10060;
        </span>
      )
    case "arrowUp":
      return (
        <span aria-hidden="true" {...props}>
          &#8593;
        </span>
      )
    case "arrowDown":
      return (
        <span aria-hidden="true" {...props}>
          &#8595;
        </span>
      )
    case "arrowRightwards":
      return (
        <span aria-hidden="true" {...props}>
          &#8594;
        </span>
      )
    case "arrowLeftwards":
      return (
        <span aria-hidden="true" {...props}>
          &#8592;
        </span>
      )
    case "arrowUpCircle":
      return (
        <span aria-hidden="true" {...props}>
          &#1048694;
        </span>
      )
    case "arrowDownCircle":
      return (
        <span aria-hidden="true" {...props}>
          &#1048696;
        </span>
      )
    case "bolt":
      return (
        <span aria-hidden="true" {...props}>
          &#128498;
        </span>
      )
    case "loupe":
      return (
        <span aria-hidden="true" {...props}>
          &#1049259;
        </span>
      )
    default:
      return null
  }
}

type Name =
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
