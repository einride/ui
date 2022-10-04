interface MetricProps {
  kilograms: number
  locales: string | Array<string>
  numberFormatOptions?: Intl.NumberFormatOptions
}

export const Metric = ({
  kilograms,
  locales,
  numberFormatOptions = {},
}: MetricProps): JSX.Element => {
  return <>{formatMetric(kilograms, locales, numberFormatOptions)}</>
}

const formatMetric = (
  kilograms: number,
  locales: string | Array<string>,
  numberFormatOptions: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(locales, {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "short",
    maximumFractionDigits: 1,
    ...numberFormatOptions,
  }).format(kilograms)
}
