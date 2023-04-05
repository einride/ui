import { describe, expect, it } from "vitest"
import { getInitials } from "./getInitials"

describe("getInitials", () => {
  it("handles one name", () => {
    const name = "Filip"
    expect(getInitials(name)).toEqual("F")
  })

  it("handles two names", () => {
    const name = "Filip Tammergård"
    expect(getInitials(name)).toEqual("FT")
  })

  it("uses first and last name if many are provided", () => {
    const name = "Filip Mats Oskar Tammergård"
    expect(getInitials(name)).toEqual("FT")
  })

  it("returns upper-case initials", () => {
    const name = "filip tammergård"
    expect(getInitials(name)).toEqual("FT")
  })

  it("returns empty string when input is empty string", () => {
    const name = ""
    expect(getInitials(name)).toEqual("")
  })

  it("trims whitespace from both ends of name", () => {
    let name = " Filip Tammergård"
    expect(getInitials(name)).toEqual("FT")

    name = "Filip Tammergård "
    expect(getInitials(name)).toEqual("FT")

    name = " Filip Tammergård "
    expect(getInitials(name)).toEqual("FT")
  })
})
