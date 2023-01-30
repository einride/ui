import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useId,
  useRef,
  useState,
} from "react"
import { useScrollIntoView } from "../../../../hooks/useScrollIntoView"
import { zIndex } from "../../../../lib/zIndex"
import { defaultFilter, filterOptions } from "./filterOptions"
import { SearchSelectInput } from "./SearchSelectInput"
import { SearchSelectOption } from "./SearchSelectOption"
import { BaseOption } from "./types"

interface SearchSelectBaseProps<Option> extends ComponentPropsWithoutRef<"input"> {
  /** Props passed to the clear button element. */
  clearButtonProps?: ComponentPropsWithoutRef<"button"> & { "data-testid": string }

  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

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

  /** Props passed to the individual options. */
  optionProps?: ComponentPropsWithoutRef<"div">

  /**  Default is `neutral`. */
  status?: Status

  /** Controlled input value. */
  value: string

  /** Props passed to root element. */
  wrapperProps?: ComponentPropsWithoutRef<"div">
}

interface SearchSelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface SearchSelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type SearchSelectProps<Option> = SearchSelectBaseProps<Option> &
  (SearchSelectWithLabelProps | SearchSelectWithoutLabelProps)

export const SearchSelect = <Option extends BaseOption>({
  dropdownProps,
  filter = defaultFilter,
  onClearClick,
  onOptionSelect,
  onSearchChange,
  options,
  optionProps,
  placeholder,
  isFilterable = true,
  value,
  wrapperProps,
  ...props
}: SearchSelectProps<Option> &
  (SearchSelectWithLabelProps | SearchSelectWithoutLabelProps)): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { isOpen, handlers } = useDisclosure(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<HTMLDivElement[]>([])
  const id = useId()

  const getTargetRef = (index: number | null): HTMLDivElement | null => {
    if (typeof index === "number") {
      return optionRefs.current[index]
    }
    return null
  }

  const { scrollableRef, scrollIntoView, targetRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >()

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
      let nextIndex = null
      if (isOpen && filteredOptions) {
        if (selectedIndex === null) {
          nextIndex = 0
          setSelectedIndex(nextIndex)
        } else if (selectedIndex < filteredOptions.length - 1) {
          nextIndex = selectedIndex + 1
          setSelectedIndex(nextIndex)
        }
      } else {
        handlers.open()
      }
      targetRef.current = getTargetRef(nextIndex)
      scrollIntoView({ alignment: "end" })
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (isOpen) {
        if (selectedIndex !== null && selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1)
          targetRef.current = getTargetRef(selectedIndex - 1)
          scrollIntoView({ alignment: "start" })
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
    handlers.close()
  }

  /** Prevent losing focus of input field */
  const preventInputBlur = (e: MouseEvent): void => {
    e.preventDefault()
  }

  return (
    <Wrapper role="combobox" aria-haspopup="listbox" {...wrapperProps} aria-expanded={isOpen}>
      <SearchSelectInput
        {...props}
        autoComplete="off"
        isOpen={isOpen && !!filteredOptions && filteredOptions.length > 0}
        onBlur={handleInputBlur}
        onChange={(e) => handleInputChange(e.target.value)}
        onClearInput={handleClearInput}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        value={options?.find((option) => option?.value === value)?.inputValue ?? value}
        ref={inputRef}
        labelProps={{
          id,
        }}
        clearButtonProps={{
          onMouseDown: preventInputBlur,
        }}
      />
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper role="listbox" aria-labelledby={id} {...dropdownProps} ref={scrollableRef}>
          {filteredOptions?.map((option, index) => (
            <SearchSelectOption
              key={option.key ?? option.value}
              isSelected={index === selectedIndex}
              aria-selected={index === selectedIndex}
              onClick={(e) => {
                e.stopPropagation()
                handleOptionSelect(option)
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={preventInputBlur}
              role="option"
              ref={(node: HTMLDivElement) => {
                optionRefs.current[index] = node
              }}
              {...optionProps}
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
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-block-start: ${({ theme }) => theme.spacer}px;
  max-block-size: ${({ theme }) => 30 * theme.spacingBase}rem;
  padding: ${({ theme }) => theme.spacer}px;
  z-index: ${zIndex.dropdown};
  overflow: auto;
  overscroll-behavior: contain;
`
