import { formatImperial } from "./formatImperial"
import { formatMetric } from "./formatMetric"

export interface WeightUnitProps {
  /** Locale used to format weight unit. Default is `en-US`. */
  locales: string | Array<string>

  /** Full `Intl` number format options that makes it possible to override defaults. */
  numberFormatOptions?: Intl.NumberFormatOptions

  /** Unit system used to format weight unit. Default is `metric`. */
  unitSystem: UnitSystem
}

/** Formats weight unit based on locale and unit system.
 *
 * @example <WeightUnit locales="en-US" unitSystem="metric" /> // => <>kg</>
 * @example <WeightUnit locales="en-US" unitSystem="imperial" /> // => <>lb</>
 */
export const WeightUnit = ({
  locales = "en-US",
  numberFormatOptions = {},
  unitSystem = "metric",
}: WeightUnitProps): JSX.Element => {
  if (unitSystem === "imperial") {
    return <>{formatImperial(locales, numberFormatOptions)}</>
  }
  return <>{formatMetric(locales, numberFormatOptions)}</>
}

type UnitSystem = "metric" | "imperial"
