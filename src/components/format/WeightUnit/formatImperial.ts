export const formatImperial = (
  locales: string | Array<string>,
  numberFormatOptions?: Intl.NumberFormatOptions,
): string => {
  return (
    new Intl.NumberFormat(locales, {
      style: "unit",
      unit: "pound",
      unitDisplay: "short",
      ...numberFormatOptions,
    })
      .formatToParts()
      .find((part) => part.type === "unit")?.value ?? ""
  )
}
