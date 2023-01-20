import { useCallback, useEffect, useRef, useState } from "react"
import { BaseOption } from "../SearchSelect/types"

type SelectedOptionsReturnType<Option> = [Option[], (options: Option[]) => void]

export const useSelectedOptions = <Option extends BaseOption>(
  value: Option[],
  onSelectionChange?: (options: Option[]) => void,
): SelectedOptionsReturnType<Option> => {
  const isControlled = value !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  const [internalValue, setInternalValue] = useState(value || [])

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (origIsControlled !== isControlled) {
        console.warn(
          `"MultiSelect" is changed from ${
            origIsControlled ? "uncontrolled to controlled" : "controlled to uncontrolled"
          }.`,
        )
      }
    }
  }, [origIsControlled, isControlled])

  const setSelectedOptions = useCallback(
    (newValue: Option[]) => {
      if (!origIsControlled) {
        setInternalValue(newValue)
      }
      onSelectionChange?.(newValue)
    },
    [origIsControlled, onSelectionChange],
  )

  return [isControlled ? value : internalValue, setSelectedOptions]
}
