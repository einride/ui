import { KILOGRAM_TO_POUND } from "./constants"

export const formatImperial = (
  kilograms: number,
  locales: string | Array<string>,
  numberFormatOptions?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: "pound",
    unitDisplay: "short",
    maximumFractionDigits: 1,
    ...numberFormatOptions,
  }).format(kilograms * KILOGRAM_TO_POUND)
}

/** @deprecated Use `KILOGRAM_TO_POUND` instead. */
export const POUND_FACTOR = 2.2046226218
