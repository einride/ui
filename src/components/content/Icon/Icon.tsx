import * as React from "react"

export interface IconProps {
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
}

export const Icon = ({ name }: IconProps) => {
  switch (name) {
    case "checkmark":
      return <>✓</>
    case "warning":
      return <>⚠︎</>
    case "chevronDown":
      return <>⌄</>
    case "chevronUp":
      return <>⌃</>
    case "chevronRight":
      return <>˃</>
    case "chevronLeft":
      return <>˂</>
    case "xMark":
      return <>❌</>
    case "arrowUp":
      return <>↑</>
    case "arrowDown":
      return <>↓</>
    case "arrowRightwards":
      return <>→</>
    case "arrowLeftwards":
      return <>←</>
    case "bolt":
      return <>☈</>
    default:
      return null
  }
}
