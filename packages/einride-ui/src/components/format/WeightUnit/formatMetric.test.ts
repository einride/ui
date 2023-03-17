import { expect, it } from "vitest"
import { formatMetric } from "./formatMetric"

it("formats metric weight unit in American locale", () => {
  expect(formatMetric("en-US")).toEqual("kg")
})

it("formats metric weight unit in Swedish locale", () => {
  expect(formatMetric("sv-SE")).toEqual("kg")
})

it("handles option overrides", () => {
  expect(formatMetric("en-US", { unitDisplay: "long" })).toEqual("kilograms")
})
