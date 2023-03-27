import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import { useUncontrolled } from "@mantine/hooks"
import {
  ComponentPropsWithoutRef,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { useScrollIntoView } from "../../../../hooks/useScrollIntoView"
import { zIndex } from "../../../../lib/zIndex"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Option } from "../../../menus/Option/Option"

import { MultiSelectInput, MultiSelectInputSharedProps } from "./MultiSelectInput"
import { BaseOption, MultiSelectWithLabelProps, MultiSelectWithoutLabelProps } from "./types"

interface MultiSelectBaseProps<Option> {
  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  /** If true, search term will be cleared after selecting an option. Default is `true`. */
  clearSearchAfterSelect?: boolean

  /** Options to render in dropdown. */
  options: Option[] | undefined

  /** Props passed to the individual options. */
  optionProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Controlled input value. */
  value?: Option[]

  /** Uncontrolled input value. */
  defaultValue?: Option[]

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

export type MultiSelectProps<Option> = Partial<MultiSelectInputSharedProps<Option>> &
  MultiSelectBaseProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

function defaultFilter<Option extends BaseOption>(value: string, option: Option): boolean {
  return (
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    (option.inputValue
      ? option.inputValue.toLowerCase().trim().includes(value.toLowerCase().trim())
      : false)
  )
}

export const MultiSelect = <Option extends BaseOption>({
  dropdownProps,
  onSelectionChange,
  onSearchChange,
  options,
  optionProps,
  clearSearchAfterSelect = true,
  value,
  defaultValue,
  wrapperProps,
  filter = defaultFilter,
  ...props
}: MultiSelectProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)): JSX.Element => {
  const [highlightedDropdownIndex, setHighlightedDropdownIndex] = useState<number | null>(null)
  const [highlightedInputIndex, setHighlightedInputIndex] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useUncontrolled<Option[] | undefined>({
    value,
    defaultValue,
    onChange: onSelectionChange,
  })
  const [sortedOptions, setSortedOptions] = useState(options || [])
  const { isOpen, handlers } = useDisclosure(false)

  const [inputValue, setInputValue] = useState("")

  const outerWrapperRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Record<string, HTMLDivElement>>({})

  const id = useId()

  // Ensure that the order of options don't change while user selects them.
  // Place selected options on top while dropdown is not visible.
  useEffect(() => {
    if (!isOpen) {
      setSortedOptions([
        ...(options || []).sort((option1, option2) => {
          if (selectedOptions?.includes(option1) && selectedOptions?.includes(option2)) {
            return 1
          }
          return selectedOptions?.includes(option1) ? -1 : 1
        }),
      ])
    }
  }, [isOpen, options, selectedOptions])

  const filteredOptions = useMemo<Option[]>(() => {
    return sortedOptions?.filter((option) => filter(inputValue, option))
  }, [filter, inputValue, sortedOptions])

  const getTargetRef = (index: number | null): HTMLDivElement | null => {
    if (typeof index === "number" && filteredOptions[index]) {
      const currentOption = filteredOptions[index]
      return optionRefs.current[currentOption.value]
    }
    return null
  }

  const { scrollableRef, scrollIntoView, targetRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >()

  const handleFocusChange = (open: boolean): void => {
    if (open) {
      handlers.open()
    } else {
      handlers.close()
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // don't blur if click on an option etc. has happened
    if (!e.relatedTarget || !outerWrapperRef.current?.contains(e.relatedTarget)) {
      handlers.close()
    }
  }

  const handleOptionSelect = (option: Option): void => {
    inputRef.current?.focus()
    if (selectedOptions?.includes(option)) {
      const newOptions = selectedOptions.filter((selectedOption) => selectedOption !== option)
      setSelectedOptions(newOptions)
    } else {
      const newOptions = [...(selectedOptions || []), option]
      setSelectedOptions(newOptions)
    }
    if (clearSearchAfterSelect) {
      onSearchChange?.("")
      setInputValue("")
    }
  }

  const handleMouseOver = (index: number): void => {
    setHighlightedDropdownIndex(index)
  }

  const handleMouseLeave = (): void => {
    setHighlightedDropdownIndex(null)
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isOpen) {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (isOpen && filteredOptions) {
          let nextIndex = null
          if (highlightedDropdownIndex === null) {
            nextIndex = 0
            setHighlightedDropdownIndex(nextIndex)
          } else if (highlightedDropdownIndex < filteredOptions.length - 1) {
            nextIndex = highlightedDropdownIndex + 1
            setHighlightedDropdownIndex(nextIndex)
          }
          targetRef.current = getTargetRef(nextIndex)
          scrollIntoView({ alignment: "end" })
        } else {
          handlers.open()
        }
        break
      case "ArrowUp":
        e.preventDefault()
        if (isOpen && highlightedDropdownIndex !== null && highlightedDropdownIndex > 0) {
          const nextIndex = highlightedDropdownIndex - 1
          setHighlightedDropdownIndex(nextIndex)
          targetRef.current = getTargetRef(nextIndex)
          scrollIntoView({ alignment: "start" })
        }
        break
      case "Enter":
        e.preventDefault()
        if (typeof highlightedDropdownIndex === "number" && filteredOptions.length > 0) {
          handleOptionSelect(filteredOptions[highlightedDropdownIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        handlers.close()
        setHighlightedDropdownIndex(null)
        inputRef.current?.blur()
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (highlightedInputIndex !== null) {
      setHighlightedDropdownIndex(null)
    }
  }, [highlightedInputIndex])

  useEffect(() => {
    if (highlightedDropdownIndex !== null) {
      setHighlightedInputIndex(null)
    }
  }, [highlightedDropdownIndex])

  useEffect(() => {
    if (!isOpen) {
      setHighlightedInputIndex(null)
    }
  }, [isOpen])

  return (
    <OuterWrapper
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onBlur={handleBlur}
      ref={outerWrapperRef}
      {...wrapperProps}
    >
      <MultiSelectInput
        filteredOptions={filteredOptions}
        inputRef={inputRef}
        inputValue={inputValue}
        isOpen={isOpen}
        id={id}
        onFocusToggle={handleFocusChange}
        onIndexHighlight={setHighlightedInputIndex}
        onSearchChange={setInputValue}
        onSelectionChange={setSelectedOptions}
        selectedOptions={selectedOptions}
        highlightedIndex={highlightedInputIndex}
        {...props}
      />
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper {...dropdownProps} ref={scrollableRef} id={`options-${id}`}>
          {filteredOptions?.map((option, index) => (
            <Option
              key={option.value}
              focused={index === highlightedDropdownIndex}
              onClick={(e) => {
                e.stopPropagation()
                handleOptionSelect(option)
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              tabIndex={-1}
              ref={(node: HTMLDivElement) => {
                optionRefs.current[option.value] = node
              }}
              selected={!!selectedOptions?.includes(option)}
              aria-selected={!!selectedOptions?.includes(option)}
              role="option"
              variant="secondary"
              {...optionProps}
            >
              {option.label}
            </Option>
          ))}
        </OptionsWrapper>
      )}
    </OuterWrapper>
  )
}

const OuterWrapper = styled(Box)`
  position: relative;
`

const OptionsWrapper = styled.div`
  position: absolute;
  inset-block-start: 100%;
  inset-inline: 0;
  max-block-size: ${({ theme }) => 30 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-block-start: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  z-index: ${zIndex.dropdown};
  overflow: auto;
  overscroll-behavior: contain;
`
