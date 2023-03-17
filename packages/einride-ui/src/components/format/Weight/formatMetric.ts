export const formatMetric = (
  kilograms: number,
  locales: string | Array<string>,
  numberFormatOptions?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "short",
    maximumFractionDigits: 1,
    ...numberFormatOptions,
  }).format(kilograms)
}
