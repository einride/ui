import styled from "@emotion/styled"
import {
  CSSProperties,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Caption } from "../../../typography/Caption/Caption"
import { SearchSelectInput } from "./SearchSelectInput"
import { SearchSelectOption } from "./SearchSelectOption"

export interface SearchSelectProps<Option> extends InputHTMLAttributes<HTMLInputElement> {
  "aria-label": string
  dropdownStyles?: CSSProperties
  filter?: (value: string, option: Option) => boolean
  isFullWidth?: boolean
  isSearchable?: boolean
  label?: ReactNode
  message?: ReactNode
  onOptionSelect?: (option: Option) => void
  onSearchChange?: (value: string) => void
  options: Option[] | undefined
  optionStyles?: CSSProperties
  status?: Status
  value?: string
  wrapperStyles?: CSSProperties
}

export const SearchSelect = <Option extends BaseOption>({
  dropdownStyles = {},
  filter = defaultFilter,
  isFullWidth = false,
  message,
  onOptionSelect,
  onSearchChange,
  options,
  optionStyles = {},
  placeholder = "Search...",
  isSearchable = false,
  status,
  value,
  wrapperStyles = {},
  ...props
}: SearchSelectProps<Option>): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = filterOptions({ options, value, filter, isSearchable })

  const handleInputBlur = (): void => {
    if (typeof selectedIndex === "number" && filteredOptions?.[selectedIndex]) {
      const selected = filteredOptions[selectedIndex]
      onSearchChange?.(selected?.value)
      onOptionSelect?.(selected)
      inputRef?.current?.focus()
    }
    setIsOpen(false)
  }

  const handleInputChange = (text: string): void => {
    onSearchChange?.(text)
    setSelectedIndex(0)
    setIsOpen(true)
  }

  const handleInputClick = (): void => {
    setIsOpen(true)
  }

  const handleInputFocus = (): void => {
    setIsOpen(true)
  }

  const handleOptionSelect = (option: Option): void => {
    onSearchChange?.(option.value)
    onOptionSelect?.(option)
    inputRef?.current?.focus()
    setIsOpen(false)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (typeof selectedIndex === "number" && filteredOptions) {
        handleOptionSelect(filteredOptions[selectedIndex])
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (isOpen && filteredOptions) {
        if (selectedIndex === null) {
          setSelectedIndex(0)
        } else if (selectedIndex < filteredOptions.length - 1) {
          setSelectedIndex(selectedIndex + 1)
        }
      } else {
        setIsOpen(true)
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (isOpen) {
        if (selectedIndex !== null && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1)
        }
      }
    }
  }

  const handleMouseOver = (index: number): void => {
    setSelectedIndex(index)
  }

  const handleMouseLeave = (): void => {
    setSelectedIndex(null)
  }

  return (
    <Wrapper isFullWidth={isFullWidth} style={wrapperStyles}>
      <SearchSelectInput
        isFullWidth={isFullWidth}
        isOpen={isOpen && !!filteredOptions && filteredOptions.length > 0}
        onBlur={handleInputBlur}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        value={value?.toString()}
        {...props}
        ref={inputRef}
      />
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper style={dropdownStyles}>
          {filteredOptions?.map((option, index) => (
            <SearchSelectOption
              key={option.value}
              isSelected={index === selectedIndex}
              onClick={() => handleOptionSelect(option)}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              style={optionStyles}
            >
              {option.label}
            </SearchSelectOption>
          ))}
        </OptionsWrapper>
      )}
      {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
    </Wrapper>
  )
}

interface BaseOption {
  label: ReactNode
  value: string
}

type Status = "success" | "fail" | "neutral"

const getMessageColor = (status: Status | undefined): ContentColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    default:
      return "secondary"
  }
}

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const OptionsWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => 6 * theme.spacer}px;
  right: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-top: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer}px;
  z-index: 1;
`

const defaultFilter = <Option extends BaseOption>(value: string, option: Option): boolean => {
  return option.value.toLowerCase().trim().includes(value.toLowerCase().trim())
}

interface FilterOptions<Option extends BaseOption> {
  filter(value: string | undefined, option: Option): boolean
  options: Option[] | undefined
  isSearchable: boolean
  value: string | undefined
}

const filterOptions = <Option extends BaseOption>({
  filter,
  options,
  isSearchable,
  value,
}: FilterOptions<Option>): Option[] => {
  if (!options) {
    return []
  }

  if (!isSearchable) {
    return options
  }

  return options.filter((option) => filter(value, option))
}
