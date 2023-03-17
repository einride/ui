import { expect, it } from "vitest"
import { formatMetric } from "./formatMetric"

it("formats metric weight unit in American locale", () => {
  expect(formatMetric(123456.789, "en-US")).toEqual("123,456.8 kg")
})

it("formats metric weight unit in Swedish locale", () => {
  expect(formatMetric(123456.789, "sv-SE")).toEqual("123 456,8 kg")
})

it("handles option overrides", () => {
  expect(formatMetric(123456.789, "en-US", { maximumFractionDigits: 2 })).toEqual("123,456.79 kg")
})
