import { isInArray } from "./guard"
import { Background, BorderRadius, Color, Gap, SpacingInput } from "./props"
import { backgroundColors, borderRadii, contentColors, spacings, Theme } from "./types"

export const getBackground = (background: Background, theme: Theme): string => {
  if (isInArray(background, backgroundColors)) return theme.colors.background[background]
  return background.toString()
}

export const getBorderRadius = (borderRadius: BorderRadius, theme: Theme): string => {
  if (typeof borderRadius === "number") return `${borderRadius * theme.spacingBase}rem`
  if (isInArray(borderRadius, borderRadii)) return theme.borderRadii[borderRadius]
  return borderRadius.toString()
}

export const getColor = (color: Color, theme: Theme): string => {
  if (isInArray(color, contentColors)) return theme.colors.content[color]
  return color.toString()
}

export const getGap = (gap: Gap, theme: Theme): string => {
  if (gap === "none") return "0px"
  return getSpacing(gap, theme)
}

export const getSpacing = (input: SpacingInput, theme: Theme): string => {
  if (typeof input === "number") return `${input * theme.spacingBase}rem`
  if (isInArray(input, spacings)) return theme.spacing[input]
  return input.toString()
}
