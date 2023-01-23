import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import { useScrollIntoView } from "@mantine/hooks"
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
} from "react"
import { Box, Icon, useTheme, zIndex } from "../../../../main"
// TODO move SearchSelect imports
import { SearchSelectOption } from "../SearchSelect/SearchSelectOption"
import { BaseOption } from "../SearchSelect/types"
import { useSelectedOptions } from "./MultiSelect.hook"

import {
  MultiSelectWithLabelProps,
  MultiSelectWithoutLabelProps,
  MultiSelectProps,
  Direction,
} from "./MultiSelect.types"
import { MultiSelectInput } from "./MultiSelectInput"

export const MultiSelect = <Option extends BaseOption>({
  dropdownProps,
  onSelectionChange,
  onSearchChange,
  options,
  optionProps,
  clearSearchAfterSelect = true,
  value,
  wrapperProps,
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
  const theme = useTheme()
  const { targetRef, scrollIntoView, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
  })

  const filteredOptions = useMemo<Option[]>(() => {
    return (options || [])?.filter((option) =>
      option.value.toLowerCase().trim().includes(inputValue.toLowerCase().trim()),
    )
  }, [inputValue, options])

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
    if (typeof highlightedDropdownIndex === "number" && filteredOptions[highlightedDropdownIndex]) {
      const currentOption = filteredOptions[highlightedDropdownIndex]
      targetRef.current = optionRefs.current[currentOption.key || currentOption.value]

      let alignment = direction
      // if option is above scroll view
      const { top } = targetRef.current?.getBoundingClientRect() || {}
      if (top < 0) {
        alignment = "start"
      }
      scrollIntoView({ alignment })
    }
  }, [highlightedDropdownIndex, filteredOptions, optionRefs, targetRef, scrollIntoView, direction])

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
