import { formatImperial } from "./formatImperial"
import { formatMetric } from "./formatMetric"

export interface WeightProps {
  /** Amount of kilograms to be formatted. */
  kilograms: number

  /** Locale used to format weight. Default is `en-US`. */
  locales: string | Array<string>

  /** Full `Intl` number format options that makes it possible to override defaults. */
  numberFormatOptions?: Intl.NumberFormatOptions

  /** Unit system used to format weight. Default is `metric`.  */
  unit: "metric" | "imperial"
}

/** Formats weight based on locale and unit system.
 *
 * @example <Weight kilograms={123456} locales="en-US" unit="metric" /> // => <>123,456.8 kg</>
 * @example <Weight kilograms={123456} locales="en-US" unit="imperial" /> // => <>272,175.6 lb</>
 */
export const Weight = ({
  kilograms,
  locales = "en-US",
  numberFormatOptions = {},
  unit = "metric",
}: WeightProps): JSX.Element => {
  if (unit === "imperial") {
    return <>{formatImperial(kilograms, locales, numberFormatOptions)}</>
  }
  return <>{formatMetric(kilograms, locales, numberFormatOptions)}</>
}
