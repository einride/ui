import { ChangeEvent, useState } from "react"

interface UseRangeTimeInputProps {
  /** Value as start time. */
  valueFrom: string

  /** Called when start time changes. */
  onChangeFrom: (event: ChangeEvent<HTMLInputElement>) => void

  /** Value as end time. */
  valueTo: string

  /** Called when end time changes. */
  onChangeTo: (event: ChangeEvent<HTMLInputElement>) => void

  /** Maximum end time. */
  maxFrom?: string | undefined

  /** Minimum start time. */
  minTo?: string | undefined

  /** Validation status of time range. */
  status: Status
}

export type Status = "fail" | "neutral"

/**
 * Hook to validate data when setting up a time range input.
 * The hook will display an error, when the start time is higher than the end time. E.g. 14:30 - 10:45.
 *
 * @example Usage:
 * ```
 *  <TimeInput
 *    label="from"
 *    name="from"
 *    max={maxFrom}
 *    onChange={onChangeFrom}
 *    value={valueFrom}
 *  />
 *  <span>&ndash;</span>
 *  <TimeInput
 *    status={status}
 *    label="to"
 *    name="to"
 *    min={minTo}
 *    onChange={onChangeTo}
 *    value={valueTo}
 *  />
 *  ```
 * @param initialValueFrom Initial value displayed as start time
 * @param initialValueTo Initial value displayed as end time
 * @returns Properties for start and end time input
 */
export const useRangeTimeInput = (
  initialValueFrom = "",
  initialValueTo = "",
): UseRangeTimeInputProps => {
  const [valueFrom, setValueFrom] = useState(initialValueFrom)
  const [valueTo, setValueTo] = useState(initialValueTo)
  const [maxFrom, setMaxFrom] = useState<string>()
  const [minTo, setMinTo] = useState<string>()
  const [status, setStatus] = useState<Status>("neutral")

  const onChangeFrom = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, validity },
    } = event
    setValueFrom(value)
    setMinTo(value)

    setStatus(validity.valid ? "neutral" : "fail")
  }

  const onChangeTo = (event: ChangeEvent<HTMLInputElement>): void => {
    setValueTo(event.target.value)
    setMaxFrom(event.target.value)

    setStatus(event.target.validity.valid ? "neutral" : "fail")
  }

  return {
    valueFrom,
    onChangeFrom,
    valueTo,
    onChangeTo,
    maxFrom,
    minTo,
    status,
  }
}
