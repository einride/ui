export interface WeightUnitProps {
  /** Locale used to format weight unit. */
  locales: string | Array<string>

  /** Measurement system used to format weight unit. */
  measurementSystem?: "metric" | "US"

  /** Full `Intl` number format options that makes it possible to override defaults. */
  numberFormatOptions?: Intl.NumberFormatOptions

  /** Unit system used to format weight unit. */
  unitSystem?: "metric" | "imperial"
}

/** Formats weight unit based on locale and measurement system.
 *
 * @example <WeightUnit locales="en-US" measurementSystem="metric" /> // => <>kg</>
 * @example <WeightUnit locales="en-US" measurementSystem="US" /> // => <>lb</>
 * @example <WeightUnit locales="sv-SE" measurementSystem="US" /> // => <>pund</>
 * @example <WeightUnit locales="en-US" measurementSystem="metric" numberFormatOptions={{ unitDisplay: "long" }} /> // => <>kilograms</>
 */
export const WeightUnit = ({
  locales,
  measurementSystem,
  numberFormatOptions,
  unitSystem,
}: WeightUnitProps): React.JSX.Element => {
  if (typeof measurementSystem !== "undefined") {
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
  return (
    <>
      {new Intl.NumberFormat(locales, {
        style: "unit",
        unit: unitSystem === "imperial" ? "pound" : "kilogram",
        unitDisplay: "short",
        ...numberFormatOptions,
      })
        .formatToParts()
        .find((part) => part.type === "unit")?.value ?? ""}
    </>
  )
}
