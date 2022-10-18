import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  LabelHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react"
import { defaultFilter, filterOptions } from "./filterOptions"
import { SearchSelectInput } from "./SearchSelectInput"
import { SearchSelectOption } from "./SearchSelectOption"
import { BaseOption } from "./types"

interface SearchSelectBaseProps<Option> extends InputHTMLAttributes<HTMLInputElement> {
  /** Props passed to the clear button element. */
  clearButtonProps?: ButtonHTMLAttributes<HTMLButtonElement> & { "data-testid": string }

  /** Styles for the dropdown. */
  dropdownStyles?: CSSProperties

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Callback called when the clear button is clicked. */
  onClearClick?: () => void

  /** Callback called when an option is selected. */
  onOptionSelect?: (option: Option) => void

  /** Callback called when the input field is updated. */
  onSearchChange?: (value: string) => void

  /** Options to render in dropdown. */
  options: Option[] | undefined

  /** Styles for the individual options. */
  optionStyles?: CSSProperties

  /**  Default is `neutral`. */
  status?: Status

  /** Controlled input value. */
  value: string

  /** Props passed to root element. */
  wrapperProps?: HTMLAttributes<HTMLDivElement>
}

interface SearchSelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

interface SearchSelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type SearchSelectProps<Option> = SearchSelectBaseProps<Option> &
  (SearchSelectWithLabelProps | SearchSelectWithoutLabelProps)

export const SearchSelect = <Option extends BaseOption>({
  dropdownStyles = {},
  filter = defaultFilter,
  onClearClick,
  onOptionSelect,
  onSearchChange,
  options,
  optionStyles = {},
  placeholder = "Search...",
  isFilterable = true,
  value,
  wrapperProps,
  ...props
}: SearchSelectProps<Option> &
  (SearchSelectWithLabelProps | SearchSelectWithoutLabelProps)): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { isOpen, handlers } = useDisclosure(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = filterOptions({ options, value, filter, isFilterable })

  const handleInputBlur = (): void => {
    if (typeof selectedIndex === "number" && filteredOptions?.[selectedIndex]) {
      const selected = filteredOptions[selectedIndex]
      onSearchChange?.(selected.value)
      onOptionSelect?.(selected)
    }
    handlers.close()
  }

  const handleInputChange = (text: string): void => {
    onSearchChange?.(text)
    setSelectedIndex(0)
    handlers.open()
  }

  const handleInputClick = (): void => {
    handlers.open()
  }

  const handleInputFocus = (): void => {
    handlers.open()
  }

  const handleOptionSelect = (option: Option): void => {
    onSearchChange?.(option.value)
    onOptionSelect?.(option)
    setSelectedIndex(0)
    inputRef?.current?.focus()
    handlers.close()
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (isOpen && filteredOptions) {
        if (selectedIndex === null) {
          setSelectedIndex(0)
        } else if (selectedIndex < filteredOptions.length - 1) {
          setSelectedIndex(selectedIndex + 1)
        }
      } else {
        handlers.open()
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

    if (e.key === "Enter") {
      e.preventDefault()
      if (typeof selectedIndex === "number" && filteredOptions.length > 0) {
        handleOptionSelect(filteredOptions[selectedIndex])
      }
    }

    if (e.key === "Escape") {
      e.preventDefault()
      handlers.close()
      setSelectedIndex(null)
    }
  }

  const handleMouseOver = (index: number): void => {
    setSelectedIndex(index)
  }

  const handleMouseLeave = (): void => {
    setSelectedIndex(null)
  }

  const handleClearInput = (): void => {
    onSearchChange?.("")
    setSelectedIndex(null)
    onClearClick?.()
    inputRef?.current?.focus()
  }

  return (
    <Wrapper {...wrapperProps}>
      <SearchSelectInput
        {...props}
        isOpen={isOpen && !!filteredOptions && filteredOptions.length > 0}
        onBlur={handleInputBlur}
        onChange={(e) => handleInputChange(e.target.value)}
        onClearInput={handleClearInput}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
      />
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper style={dropdownStyles}>
          {filteredOptions?.map((option, index) => (
            <SearchSelectOption
              key={option.key ?? option.value}
              isSelected={index === selectedIndex}
              onClick={(e) => {
                e.stopPropagation()
                handleOptionSelect(option)
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              style={optionStyles}
            >
              {option.label}
            </SearchSelectOption>
          ))}
        </OptionsWrapper>
      )}
    </Wrapper>
  )
}

type Status = "success" | "fail" | "neutral"

const Wrapper = styled.div`
  position: relative;
`

const OptionsWrapper = styled.div`
  position: absolute;
  inset-block-start: 100%;
  inset-inline: 0;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-block-start: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer}px;
  z-index: 1;
`
