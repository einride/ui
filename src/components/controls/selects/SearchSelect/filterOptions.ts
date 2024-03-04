import { BaseOption } from "./types"

interface FilterOptions<Option extends BaseOption> {
  filter(value: string | undefined, option: Option): boolean
  options: Option[] | undefined
  isFilterable: boolean
  value: string | undefined
}

export const filterOptions = <Option extends BaseOption>({
  filter,
  options,
  isFilterable,
  value,
}: FilterOptions<Option>): Option[] => {
  if (!options) {
    return []
  }

  if (!isFilterable) {
    return options
  }

  return options.filter((option) => filter(value, option))
}

export const defaultFilter = <Option extends BaseOption>(
  value: string,
  option: Option,
): boolean => {
  return (
    option?.value?.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    (option?.inputValue
      ? option.inputValue.toLowerCase().trim().includes(value.toLowerCase().trim())
      : false)
  )
}
