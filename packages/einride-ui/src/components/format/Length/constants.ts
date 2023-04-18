const YARD_TO_METER = 0.9144 // definition: https://en.wikipedia.org/wiki/International_yard_and_pound
export const METER_TO_YARD = 1 / YARD_TO_METER

const KILOMETER_TO_METER = 1000
const MILE_TO_YARD = 1760 // definition: https://en.wikipedia.org/wiki/Imperial_units

export const KILOMETER_TO_MILE = (KILOMETER_TO_METER * METER_TO_YARD) / MILE_TO_YARD
