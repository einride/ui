import { forwardRef, HTMLAttributes } from "react"

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ name, ...props }, ref) => {
    switch (name) {
      case "checkmark":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#10003;
          </span>
        )
      case "warning":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#1049087;
          </span>
        )
      case "chevronDown":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8964;
          </span>
        )
      case "chevronUp":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8963;
          </span>
        )
      case "chevronRight":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#707;
          </span>
        )
      case "chevronLeft":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#706;
          </span>
        )
      case "xMark":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#10060;
          </span>
        )
      case "arrowUp":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8593;
          </span>
        )
      case "arrowDown":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8595;
          </span>
        )
      case "arrowRight":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8594;
          </span>
        )
      case "arrowLeft":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#8592;
          </span>
        )
      case "arrowUpCircle":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#1048694;
          </span>
        )
      case "arrowDownCircle":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#1048696;
          </span>
        )
      case "bolt":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#128498;
          </span>
        )
      case "loupe":
        return (
          <span aria-hidden="true" {...props} ref={ref}>
            &#1049259;
          </span>
        )
      default:
        return null
    }
  },
)

export type IconName =
  | "checkmark"
  | "warning"
  | "chevronDown"
  | "chevronUp"
  | "chevronRight"
  | "chevronLeft"
  | "xMark"
  | "arrowUp"
  | "arrowDown"
  | "arrowRight"
  | "arrowLeft"
  | "arrowUpCircle"
  | "arrowDownCircle"
  | "bolt"
  | "loupe"
