import { expect, it } from "vitest"
import { formatImperial } from "./formatImperial"

it("formats imperial weight in American locale", () => {
  expect(formatImperial(123456.789, "en-US")).toEqual("272,175.6 lb")
})

it("formats imperial weight in Swedish locale", () => {
  expect(formatImperial(123456.789, "sv-SE")).toEqual("272 175,6 pund")
})

it("handles option overrides", () => {
  expect(formatImperial(123456.789, "en-US", { unitDisplay: "long" })).toEqual("272,175.6 pounds")
})
