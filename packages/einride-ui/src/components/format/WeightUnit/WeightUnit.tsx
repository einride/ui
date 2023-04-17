export interface WeightUnitProps {
  /** Locale used to format weight unit. */
  locales: string | Array<string>

  /** Measurement system used to format weight unit. */
  measurementSystem: "metric" | "US"

  /** Full `Intl` number format options that makes it possible to override defaults. */
  numberFormatOptions?: Intl.NumberFormatOptions
}

/** Formats weight unit based on locale and measurement system.
 *
 * @example <WeightUnit locales="en-US" unitSystem="metric" /> // => <>kg</>
 * @example <WeightUnit locales="en-US" unitSystem="imperial" /> // => <>lb</>
 */
export const WeightUnit = ({
  locales,
  measurementSystem,
  numberFormatOptions,
}: WeightUnitProps): JSX.Element => {
  return (
    <>
      {new Intl.NumberFormat(locales, {
        style: "unit",
        unit: measurementSystem === "US" ? "pound" : "kilogram",
        unitDisplay: "short",
        ...numberFormatOptions,
      })
        .formatToParts()
        .find((part) => part.type === "unit")?.value ?? ""}
    </>
  )
}
