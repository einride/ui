import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  ComponentPropsWithoutRef,
} from "react"
import { useScrollIntoView } from "../../../../hooks/useScrollIntoView"
import { zIndex } from "../../../../lib/zIndex"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps, Box } from "../../../layout/Box/Box"
import { MenuItem } from "../../../menus/MenuItem/MenuItem"
import { useSelectedOptions } from "./hooks/useSelectedOptions"

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

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

type MultiSelectProps<Option> = Partial<MultiSelectInputSharedProps<Option>> &
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
  wrapperProps,
  filter = defaultFilter,
  ...props
}: MultiSelectProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)): JSX.Element => {
  const [highlightedDropdownIndex, setHighlightedDropdownIndex] = useState<number | null>(null)
  const [highlightedInputIndex, setHighlightedInputIndex] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useSelectedOptions<Option>(value, onSelectionChange)
  const { isOpen, handlers } = useDisclosure(false)

  const [inputValue, setInputValue] = useState("")

  const outerWrapperRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Record<string, HTMLDivElement>>({})

  const id = useId()

  const filteredOptions = useMemo<Option[]>(() => {
    return (options || [])?.filter((option) => filter(inputValue, option))
  }, [filter, inputValue, options])

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
    if (selectedOptions.includes(option)) {
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
            <StyledMenuItem
              key={option.value}
              isSelected={index === highlightedDropdownIndex}
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
              aria-selected={selectedOptions.includes(option)}
              role="option"
              {...optionProps}
            >
              {option.label}
              {selectedOptions.includes(option) && <StyledCheckIcon name="checkmark" />}
            </StyledMenuItem>
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

const StyledMenuItem = styled(MenuItem)<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.background.tertiary : theme.colors.background.secondaryElevated};
`

const StyledCheckIcon = styled(motion(Icon))`
  flex: 0 0 ${({ theme }) => 3 * theme.spacingBase}rem;
  inset-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  margin-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`
