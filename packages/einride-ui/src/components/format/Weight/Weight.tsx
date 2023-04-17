import { KILOGRAM_TO_POUND } from "./constants"

export interface WeightProps {
  /** Locale used to format weight. */
  locales: string | Array<string>

  /** Measurement system used to format weight. */
  measurementSystem: "metric" | "US"

  /** Full `Intl` number format options that makes it possible to override defaults. */
  numberFormatOptions?: Intl.NumberFormatOptions

  /** Weight and unit to be formatted. */
  weight: { unit: "kilogram" | "pound"; value: number }
}

/**
 * Formats weight based on locale and measurement system.
 * @example <Weight locales="en-US" measurementSystem="metric" weight={{ unit: "kilogram", value: 123456.789 }} /> // => <>123,456.8 kg</>
 * @example <Weight locales="en-US" measurementSystem="US" weight={{ unit: "pound", value: 123456.789 }} /> // => <>123,456.8 lb</>
 * @example <Weight locales="en-US" measurementSystem="metric" weight={{ unit: "pound", value: 123456.789 }} /> // => <>55,999.1 kg</>
 * @example <Weight locales="en-US" measurementSystem="US" weight={{ unit: "metric", value: 123456.789 }} /> // => <>272,175.6 lb</>
 * @example <Weight locales="sv-SE" measurementSystem="US" weight={{ unit: "pound", value: 123456.789 }} /> // => <>123 456,8 pund</>
 * @example <Weight locales="en-US" measurementSystem="metric" numberFormatOptions={{ maximumSignificantDigits: 3 }} weight={{ unit: "kilogram", value: 123456.789 }} /> // => <>123,000 kg</>
 */
export const Weight = ({
  locales,
  measurementSystem,
  numberFormatOptions,
  weight,
}: WeightProps): JSX.Element => {
  if (measurementSystem === "US") {
    return (
      <>
        {new Intl.NumberFormat(locales, {
          style: "unit",
          unit: "pound",
          unitDisplay: "short",
          maximumFractionDigits: 1,
          ...numberFormatOptions,
        }).format(weight.unit === "kilogram" ? weight.value * KILOGRAM_TO_POUND : weight.value)}
      </>
    )
  }
  return (
    <>
      {new Intl.NumberFormat(locales, {
        style: "unit",
        unit: "kilogram",
        unitDisplay: "short",
        maximumFractionDigits: 1,
        ...numberFormatOptions,
      }).format(weight.unit === "kilogram" ? weight.value : weight.value / KILOGRAM_TO_POUND)}
    </>
  )
}
