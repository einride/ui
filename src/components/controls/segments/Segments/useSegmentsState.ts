import { useState } from "react"

interface UseSegmentStateProps {
  defaultValue: number | undefined
  onChange: ((value: number) => void) | undefined
  value: number | undefined
}

export const useSegmentState = ({
  defaultValue,
  onChange,
  value,
}: UseSegmentStateProps): { handleChange: (value: number) => void; value: number } => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue !== undefined ? defaultValue : 0,
  )

  const handleUncontrolledChange = (val: number): void => {
    setUncontrolledValue(val)
    onChange?.(val)
  }

  if (value !== undefined && onChange !== undefined) {
    return { value, handleChange: onChange }
  }

  return { value: uncontrolledValue, handleChange: handleUncontrolledChange }
}
