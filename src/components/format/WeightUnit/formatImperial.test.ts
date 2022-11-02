import { expect, it } from "vitest"
import { formatImperial } from "./formatImperial"

it("formats imperial weight unit in American locale", () => {
  expect(formatImperial("en-US")).toEqual("lb")
})

it("formats imperial weight unit in Swedish locale", () => {
  expect(formatImperial("sv-SE")).toEqual("pund")
})

it("handles option overrides", () => {
  expect(formatImperial("en-US", { unitDisplay: "long" })).toEqual("pounds")
})
