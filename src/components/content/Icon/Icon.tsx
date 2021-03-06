import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  as?: ElementType
  color?: ContentColor
  name: IconName
}

// use for example https://mothereff.in/html-entities to convert figma icons to html entities

export const Icon = forwardRef<HTMLSpanElement, IconProps>(({ name, ...props }, ref) => {
  switch (name) {
    case "checkmark":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#10003;
        </StyledSpan>
      )
    case "warning":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#1049087;
        </StyledSpan>
      )
    case "chevronDown":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8964;
        </StyledSpan>
      )
    case "chevronUp":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8963;
        </StyledSpan>
      )
    case "chevronRight":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#707;
        </StyledSpan>
      )
    case "chevronLeft":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#706;
        </StyledSpan>
      )
    case "xMark":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#10060;
        </StyledSpan>
      )
    case "arrowUp":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8593;
        </StyledSpan>
      )
    case "arrowDown":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8595;
        </StyledSpan>
      )
    case "arrowRight":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8594;
        </StyledSpan>
      )
    case "arrowLeft":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#8592;
        </StyledSpan>
      )
    case "arrowUpCircle":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#1048694;
        </StyledSpan>
      )
    case "arrowDownCircle":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#1048696;
        </StyledSpan>
      )
    case "bolt":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#128498;
        </StyledSpan>
      )
    case "loupe":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#1049259;
        </StyledSpan>
      )
    case "plus":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#43;
        </StyledSpan>
      )
    case "ellipsis":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#x100360;
        </StyledSpan>
      )
    case "plusCircle":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#x10004C;
        </StyledSpan>
      )
    case "minusCircle":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#x10004E;
        </StyledSpan>
      )
    case "UNSAFE_repeat":
      return (
        <StyledSpan aria-hidden="true" {...props} ref={ref}>
          &#x27F3;
        </StyledSpan>
      )
    default:
      return null
  }
})

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
  | "plus"
  | "ellipsis"
  | "plusCircle"
  | "minusCircle"
  | "UNSAFE_repeat"

const StyledSpan = styled.span<{ color?: ContentColor }>`
  ${({ color, theme }) => color && `color: ${theme.colors.content[color]}`};
`
