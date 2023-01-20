import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import { useScrollIntoView } from "@mantine/hooks"
import { motion } from "framer-motion"
import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from "react"
import { Box, Caption, ContentColor, Icon, useTheme, zIndex } from "../../../../main"
// TODO move types
import { SearchSelectOption } from "../SearchSelect/SearchSelectOption"
import { BaseOption } from "../SearchSelect/types"
import { useSelectedOptions } from "./MultiSelect.hook"

import {
  MultiSelectWithLabelProps,
  MultiSelectWithoutLabelProps,
  MultiSelectProps,
  Direction,
  Status,
} from "./MultiSelect.types"

export const MultiSelect = <Option extends BaseOption>({
  dropdownProps,
  // filter = defaultFilter,
  clearButtonProps,
  onClearClick,
  onSelectionChange,
  onSearchChange,
  options,
  optionProps,
  placeholder = "Search...",
  // isFilterable = true,
  clearSearchAfterSelect = true,
  value,
  wrapperProps,
  inputProps,
  message,
  status,
  ...props
}: MultiSelectProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useSelectedOptions<Option>(value, onSelectionChange)
  const [direction, setDirection] = useState<Direction>("end")
  const { isOpen, handlers } = useDisclosure(false)

  const [inputValue, setInputValue] = useState("")
  const [inputInlineSize, setInputInlineSize] = useState(0)
  const [contentInlineSize, setContentInlineSize] = useState<number | undefined>()

  const outerWrapperRef = useRef<HTMLInputElement>(null)
  const optionWrapperRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const shadowElRef = useRef<HTMLElement>(null)
  const optionRefs = useRef<Record<string, HTMLDivElement>>({})

  const id = useId()
  const messageId = useId()
  const theme = useTheme()
  const dropdownScroller = useScrollIntoView({
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
  })
  const pillScroller = useScrollIntoView({
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
    axis: "x",
  })

  const filteredOptions = useMemo<Option[]>(() => {
    return (options || [])?.filter((option) =>
      option.value.toLowerCase().trim().includes(inputValue.toLowerCase().trim()),
    )
  }, [inputValue, options])

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // don't blur if click on an option etc. has happened
    if (!e.relatedTarget || !outerWrapperRef.current?.contains(e.relatedTarget)) {
      handlers.close()
    }
  }

  const handleInputChange = (text: string): void => {
    onSearchChange?.(text)
    setSelectedIndex(0)
    setInputValue(text)
    handlers.open()
  }

  const handleInputFocus = (): void => {
    handlers.open()
  }

  const handleOptionSelect = (option: Option): void => {
    onSearchChange?.(option.value)
    inputRef.current?.focus()
    if (selectedOptions.includes(option)) {
      const newOptions = selectedOptions.filter((selectedOption) => selectedOption !== option)
      setSelectedOptions(newOptions)
    } else {
      const newOptions = [...(selectedOptions || []), option]
      setSelectedOptions(newOptions)
    }
    if (clearSearchAfterSelect) {
      setInputValue("")
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { current } = inputRef
    if (
      (e.key === "ArrowLeft" || e.key === "Backspace") &&
      current?.selectionStart === 0 &&
      current?.selectionEnd === 0
    ) {
      const lastOption = optionWrapperRef.current?.lastElementChild as HTMLElement
      lastOption?.focus()
    }
  }

  const handleMouseOver = (index: number): void => {
    setSelectedIndex(index)
  }

  const handleMouseLeave = (): void => {
    setSelectedIndex(null)
  }

  const handleClearInput = (): void => {
    setSelectedOptions([])
    setInputValue("")
    onClearClick?.()
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isOpen) {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setDirection("end")
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
      setDirection("start")
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

  const handlePillKeyDown = (e: KeyboardEvent<HTMLButtonElement>, option: Option): void => {
    const target = e.target as HTMLButtonElement
    const previousTarget = target.previousElementSibling as HTMLElement
    const nextTarget = target.nextElementSibling as HTMLElement

    if (e.key !== "Tab") {
      e.preventDefault()
    }

    if (e.key === "ArrowLeft") {
      previousTarget?.focus()
      setDirection("start")
    } else if (e.key === "ArrowRight") {
      setDirection("end")
      if (nextTarget && nextTarget.tabIndex > -1) {
        nextTarget?.focus()
      } else {
        inputRef.current?.focus()
      }
    } else if (e.key === "Backspace" || e.key === "Enter") {
      setDirection("end")
      const newOptions = selectedOptions.filter((selectedOption) => selectedOption !== option)
      setSelectedOptions(newOptions)
      if (previousTarget && previousTarget.tabIndex > -1) {
        previousTarget.focus()
      } else if (nextTarget && nextTarget.tabIndex > -1) {
        nextTarget.focus()
      } else {
        inputRef.current?.focus()
      }
    }

    if (e.key === "Enter") {
      e.stopPropagation()
    }
  }

  /**
   * Focus input field when clicking on component
   * @param e
   */
  const handlePillMouseDown = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isOpen) {
      e.preventDefault()
    }
  }
  /**
   * Don't blur input field on label click
   * @param e
   */
  const handleLabelMouseDown = (e: MouseEvent<HTMLLabelElement>): void => {
    if (isOpen) {
      e.preventDefault()
    }
  }

  const handlePillFocus = (e: FocusEvent<HTMLButtonElement>, option: Option): void => {
    pillScroller.targetRef.current = e.target
    pillScroller.scrollIntoView({ alignment: direction })
    const index = filteredOptions?.findIndex((o) => o === option)
    if (index > -1) {
      setSelectedIndex(index)
    }
  }

  useLayoutEffect(() => {
    setInputInlineSize(
      Math.max(shadowElRef.current?.offsetWidth || 0, (isOpen ? 8 : 4) * theme.spacer),
    )
  }, [inputValue, isOpen, theme.spacer])

  useLayoutEffect(() => {
    setContentInlineSize((optionWrapperRef.current?.clientWidth || 0) + inputInlineSize)
  }, [inputInlineSize, isOpen, optionWrapperRef, selectedOptions])

  useEffect(() => {
    if (typeof selectedIndex === "number" && filteredOptions[selectedIndex]) {
      const currentOption = filteredOptions[selectedIndex]
      dropdownScroller.targetRef.current =
        optionRefs.current[currentOption.key || currentOption.value]

      let alignment = direction
      // if option is above scroll view
      const { top } = dropdownScroller.targetRef.current?.getBoundingClientRect() || {}
      if (top < 0) {
        alignment = "start"
      }
      dropdownScroller.scrollIntoView({ alignment })
    }
  }, [
    selectedIndex,
    filteredOptions,
    optionRefs,
    dropdownScroller.targetRef,
    dropdownScroller.scrollIntoView,
    direction,
    dropdownScroller,
  ])

  return (
    <OuterWrapper
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onBlur={handleBlur}
      ref={outerWrapperRef}
      {...wrapperProps}
    >
      {"label" in props && (
        <StyledLabel {...props.labelProps} htmlFor={id} onMouseDown={handleLabelMouseDown}>
          {props.label}
        </StyledLabel>
      )}
      <Wrapper ref={pillScroller.scrollableRef}>
        <ScrollContent style={{ flex: `0 0 ${contentInlineSize}px` }}>
          {selectedOptions.length ? (
            <SelectedOptionsWrapper ref={optionWrapperRef}>
              {selectedOptions.map((option) => (
                <Pill
                  onFocus={(e) => handlePillFocus(e, option)}
                  onKeyDown={(e) => handlePillKeyDown(e, option)}
                  onMouseDown={handlePillMouseDown}
                  key={option.key ?? option.value}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {option.label}
                </Pill>
              ))}
            </SelectedOptionsWrapper>
          ) : null}
          <InputWrapper style={{ minInlineSize: `${inputInlineSize}px` }}>
            <Input
              type="text"
              id={id}
              value={inputValue}
              placeholder={selectedOptions.length ? "" : placeholder}
              onKeyDown={handleInputKeyDown}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              autoComplete="off"
              ref={inputRef}
              aria-errormessage={status === "fail" && message ? messageId : undefined}
              aria-describedby={status !== "fail" && message ? messageId : undefined}
              aria-invalid={status === "fail"}
              {...inputProps}
            />
            <Shadow ref={shadowElRef}>{inputValue}</Shadow>
          </InputWrapper>
          {inputValue || selectedOptions.length ? (
            <ClearButton type="button" onClick={handleClearInput} {...clearButtonProps}>
              <StyledIcon name="xMark" />
            </ClearButton>
          ) : (
            <StyledIcon name="chevronRight" animate={{ rotate: isOpen ? 90 : 0 }} />
          )}
        </ScrollContent>
      </Wrapper>
      {message && (
        <Caption color={getMessageColor(status)} id={messageId}>
          {message}
        </Caption>
      )}
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper {...dropdownProps} ref={dropdownScroller.scrollableRef}>
          {filteredOptions?.map((option, index) => (
            <StyledSearchSelectOption
              key={option.key ?? option.value}
              isSelected={index === selectedIndex}
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
              {...optionProps}
            >
              {option.label}
              {selectedOptions.includes(option) && <StyledCheckIcon name="arrowRight" />}
            </StyledSearchSelectOption>
          ))}
        </OptionsWrapper>
      )}
    </OuterWrapper>
  )
}

interface StyledInputProps {
  hasLabel?: boolean
}

const OuterWrapper = styled(Box)`
  position: relative;
`

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-block-start: 5px;
  padding-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`

const Wrapper = styled.div<StyledInputProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  overflow: auto;
  scrollbar-width: none;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  padding-block: ${({ theme }) => theme.spacingBase}rem;
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};

  &:focus {
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.secondary};
  }

  &:disabled,
  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
    cursor: not-allowed;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const ScrollContent = styled.div`
  display: flex;
  min-inline-size: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacingBase}rem;
`

const InputWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  inline-size: 100%;
  transition: min-inline-size 0.1s;
  block-size: ${({ theme }) => 4 * theme.spacingBase}rem;
  line-height: ${({ theme }) => 4 * theme.spacingBase}rem;
`

const Shadow = styled.span`
  // add some error margin
  padding-inline: ${({ theme }) => 1 * theme.spacingBase}rem;
  white-space: pre;
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: -1;
`

const Input = styled.input`
  background: transparent;
  position: absolute;
  inset: 0;

  &:focus {
    outline: 0;
  }
`

const Pill = styled.button`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding: ${({ theme }) => 0.5 * theme.spacingBase}rem ${({ theme }) => theme.spacingBase}rem;
  white-space: nowrap;
  overflow: hidden;

  &:focus {
    background-color: lightblue;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
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

const SelectedOptionsWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
  gap: ${({ theme }) => theme.spacingBase}rem;
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

const ClearButton = styled.button``

const StyledIcon = styled(motion(Icon))`
  flex: 0 0 ${({ theme }) => 3 * theme.spacingBase}rem;
  inset-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  margin-inline-end: ${({ theme }) => -1 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
