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
import { zIndex } from "../../../../lib/zIndex"
import { Icon } from "../../../content/Icon/Icon"
import { BoxProps, Box } from "../../../layout/Box/Box"
// TODO move SearchSelect imports
import { SearchSelectOption } from "../SearchSelect/SearchSelectOption"
import { BaseOption } from "../SearchSelect/types"
import { useScrollIntoView } from "./hooks/useScrollIntoView"
import { useSelectedOptions } from "./hooks/useSelectedOptions"

import { MultiSelectInput, MultiSelectInputSharedProps } from "./MultiSelectInput"
import { MultiSelectWithLabelProps, MultiSelectWithoutLabelProps, Direction } from "./types"

interface MultiSelectBaseProps<Option> {
  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  /** Set if search term should be cleared after selecting an option. */
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
  return option.value.toLowerCase().trim().includes(value.toLowerCase().trim())
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
  const [direction, setDirection] = useState<Direction>("end")
  const { isOpen, handlers } = useDisclosure(false)

  const [inputValue, setInputValue] = useState("")

  const outerWrapperRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Record<string, HTMLDivElement>>({})

  const id = useId()

  const filteredOptions = useMemo<Option[]>(() => {
    return (options || [])?.filter((option) => filter(inputValue, option))
  }, [filter, inputValue, options])

  const targetRef = useMemo((): HTMLDivElement | null => {
    if (typeof highlightedDropdownIndex === "number" && filteredOptions[highlightedDropdownIndex]) {
      const currentOption = filteredOptions[highlightedDropdownIndex]
      return optionRefs.current[currentOption.key || currentOption.value]
    }
    return null
  }, [filteredOptions, highlightedDropdownIndex])

  const { scrollableRef } = useScrollIntoView<HTMLDivElement, HTMLDivElement>({
    axis: "y",
    direction,
    targetRef,
  })

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
      case "ArrowLeft":
        setDirection("start")
        break
      case "ArrowRight":
        setDirection("end")
        break
      case "ArrowDown":
        e.preventDefault()
        setDirection("end")
        if (isOpen && filteredOptions) {
          if (highlightedDropdownIndex === null) {
            setHighlightedDropdownIndex(0)
          } else if (highlightedDropdownIndex < filteredOptions.length - 1) {
            setHighlightedDropdownIndex(highlightedDropdownIndex + 1)
          }
        } else {
          handlers.open()
        }
        break
      case "ArrowUp":
        e.preventDefault()
        setDirection("start")
        if (isOpen && highlightedDropdownIndex !== null && highlightedDropdownIndex > 0) {
          setHighlightedDropdownIndex(highlightedDropdownIndex - 1)
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
            <StyledSearchSelectOption
              key={option.key ?? option.value}
              isSelected={index === highlightedDropdownIndex || selectedOptions.includes(option)}
              onClick={(e) => {
                e.stopPropagation()
                handleOptionSelect(option)
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              tabIndex={-1}
              ref={(node: HTMLDivElement) => {
                optionRefs.current[option.key ?? option.value] = node
              }}
              aria-selected={selectedOptions.includes(option)}
              role="option"
              {...optionProps}
            >
              {option.label}
              {selectedOptions.includes(option) && <StyledCheckIcon name="checkmark" />}
            </StyledSearchSelectOption>
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
  max-block-size: ${({ theme }) => 26 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-block-start: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.dropdown};
  overflow: auto;
  overscroll-behavior: contain;
`

const StyledSearchSelectOption = styled(SearchSelectOption)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
