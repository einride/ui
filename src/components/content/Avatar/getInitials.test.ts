import { describe, expect, it } from "vitest"
import { getInitials } from "./getInitials"

describe("getInitials", () => {
  it("handles one name", () => {
    const name = "Filip"
    const initials = getInitials(name)
    expect(initials).toEqual("F")
  })

  it("handles two names", () => {
    const name = "Filip Tammergård"
    const initials = getInitials(name)
    expect(initials).toEqual("FT")
  })

  it("uses first and last name if many are provided", () => {
    const name = "Filip Mats Oskar Tammergård"
    const initials = getInitials(name)
    expect(initials).toEqual("FT")
  })

  it("returns upper-case initials", () => {
    const name = "filip tammergård"
    const initials = getInitials(name)
    expect(initials).toEqual("FT")
  })
})
