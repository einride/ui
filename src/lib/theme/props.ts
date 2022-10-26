import { CSSProperties, ElementType } from "react"
import { Spacing } from "./types"

export type AlignItems = CSSProperties["alignItems"]
export type As = ElementType
export type FlexWrap = CSSProperties["flexWrap"]
export type Gap = Spacing | "none" | Omit<string, Spacing | "none"> | number
export type JustifyContent = CSSProperties["justifyContent"]
export type Width = Spacing | Omit<string, Spacing> | number
