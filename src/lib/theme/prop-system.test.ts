import { describe, expect, it } from "vitest"
import {
  getBackground,
  getBorderRadius,
  getColor,
  getFont,
  getGap,
  getSpacing,
} from "./prop-system"
import { themes } from "./theme"

const theme = themes.light

describe("getBackground", () => {
  it("handles theme background colors", () => {
    expect(getBackground("positive", theme)).toEqual(theme.colors.background.positive)
  })
  it("handles custom colors", () => {
    expect(getBackground("#123456", theme)).toEqual("#123456")
  })
})

describe("getBorderRadius", () => {
  it("handles theme border radii", () => {
    expect(getBorderRadius("lg", theme)).toEqual(theme.borderRadii.lg)
  })
  it("handles custom border radii based on theme spacing", () => {
    expect(getBorderRadius(12, theme)).toEqual(`${12 * theme.spacingBase}rem`)
  })
  it("handles custom border radii", () => {
    expect(getBorderRadius("3.14px", theme)).toEqual("3.14px")
  })
})

describe("getColor", () => {
  it("handles theme colors", () => {
    expect(getColor("positive", theme)).toEqual(theme.colors.content.positive)
  })
  it("handles custom colors", () => {
    expect(getColor("#123456", theme)).toEqual("#123456")
  })
})

describe("getFont", () => {
  it("handles theme fonts", () => {
    expect(getFont("mono", theme)).toEqual(theme.fonts.mono)
  })
  it("handles custom fonts", () => {
    expect(getFont("Arial", theme)).toEqual("Arial")
  })
})

describe("getGap", () => {
  it("handles none", () => {
    expect(getGap("none", theme)).toEqual("0px")
  })
  it("handles theme spacings", () => {
    expect(getGap("lg", theme)).toEqual(theme.spacing.lg)
  })
  it("handles custom spacings based on theme spacing", () => {
    expect(getGap(12, theme)).toEqual(`${12 * theme.spacingBase}rem`)
  })
  it("handles custom spacings", () => {
    expect(getGap("3.14px", theme)).toEqual("3.14px")
  })
})

describe("getSpacing", () => {
  it("handles theme spacings", () => {
    expect(getSpacing("lg", theme)).toEqual(theme.spacing.lg)
  })
  it("handles custom spacings based on theme spacing", () => {
    expect(getSpacing(12, theme)).toEqual(`${12 * theme.spacingBase}rem`)
  })
  it("handles custom spacings", () => {
    expect(getSpacing("3.14px", theme)).toEqual("3.14px")
  })
})
