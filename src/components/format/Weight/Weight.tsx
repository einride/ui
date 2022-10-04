import { Imperial } from "./Imperial"
import { Metric } from "./Metric"

export interface WeightProps {
  /** Amount of kilograms to be formatted. */
  kilograms: number

  /** Locale to format in. Default is `en-US`. */
  locales: string | Array<string>

  /** Unit format used. Default is `metric`.  */
  unit: Unit
}

export const Weight = ({
  kilograms,
  locales = "en-US",
  unit = "metric",
}: WeightProps): JSX.Element => {
  if (unit === "imperial") {
    return <Imperial kilograms={kilograms} locales={locales} />
  }
  return <Metric kilograms={kilograms} locales={locales} />
}

type Unit = "metric" | "imperial"
