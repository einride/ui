import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useId,
  useEffect,
} from "react"
import { Box, useTheme, zIndex } from "../../../../main"
import { SearchSelectOption } from "../SearchSelect/SearchSelectOption"
// TODO move types
import { BaseOption } from "../SearchSelect/types"

const MAX_ITEMS = 2

interface MultiSelectBaseProps<Option> extends ComponentPropsWithoutRef<"input"> {
  /** Props passed to the clear button element. */
  clearButtonProps?: ComponentPropsWithoutRef<"button"> & { "data-testid": string }

  /** Props passed to dropdown element. */
  dropdownProps?: ComponentPropsWithoutRef<"div"> & { "data-testid": string }

  /** Filtering function to be used to populate dropdown. Filters on `option.value` by default. */
  filter?: (value: string, option: Option) => boolean

  /** If `false`, consumer have control over which options to pass to dropdown. Defaults to `true`. */
  isFilterable?: boolean

  clearSearchAfterSelect?: boolean

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

interface MultiSelectWithLabelProps {
  /** Input label, displayed before input. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface MultiSelectWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type MultiSelectProps<Option> = MultiSelectBaseProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

export const MultiSelect = <Option extends BaseOption>({
  dropdownProps,
  // filter = defaultFilter,
  onClearClick,
  onOptionSelect,
  onSearchChange,
  options,
  optionProps,
  placeholder = "Search...",
  isFilterable = true,
  clearSearchAfterSelect,
  value,
  wrapperProps,
  label,
  labelProps,
  ...props
}: MultiSelectProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const { isOpen, handlers } = useDisclosure(false)

  const [inputValue, setInputValue] = useState("")
  const [inputWidth, setInputWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState<number | undefined>()
  const [dropdownMaxBlockSize, setDropdownMaxBlockSize] = useState<number | undefined>()

  const outerWrapperRef = useRef<HTMLInputElement>(null)
  const optionWrapperRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const shadowElRef = useRef<HTMLElement>(null)

  const id = useId()
  const theme = useTheme()

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
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option))
    } else {
      onOptionSelect?.(option)
      setSelectedOptions([...(selectedOptions || []), option])
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
    onSearchChange?.("")
    setSelectedIndex(null)
    onClearClick?.()
    inputRef?.current?.focus()
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

  const handlePillKeyDown = (e: KeyboardEvent<HTMLButtonElement>, option: Option): void => {
    const target = e.target as HTMLButtonElement
    const previousTarget = target.previousElementSibling as HTMLElement
    const nextTarget = target.nextElementSibling as HTMLElement

    if (e.key === "ArrowLeft") {
      previousTarget?.focus()
      previousTarget?.scrollIntoView()
    } else if (e.key === "ArrowRight") {
      if (nextTarget && nextTarget.tabIndex > -1) {
        nextTarget?.focus()
        nextTarget?.scrollIntoView()
      } else {
        inputRef.current?.focus()
      }
    } else if (e.key === "Backspace" || e.key === "Enter") {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option))
      if (previousTarget && previousTarget.tabIndex > -1) {
        previousTarget.focus()
      } else if (nextTarget && nextTarget.tabIndex > -1) {
        nextTarget.focus()
      } else {
        inputRef.current?.focus()
      }
    }

    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  /**
   * Focus input field when clicking on component
   * @param e
   */
  const handlePillClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isOpen) {
      e.preventDefault()
    }
  }

  const handlePillFocus = (e: FocusEvent<HTMLButtonElement>): void => {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    })
  }

  useLayoutEffect(() => {
    setInputWidth(Math.max(shadowElRef.current?.offsetWidth || 0, (isOpen ? 8 : 4) * theme.spacer))
  }, [inputValue, isOpen, theme.spacer])

  useLayoutEffect(() => {
    setContentWidth((optionWrapperRef.current?.clientWidth || 0) + inputWidth)
  }, [inputWidth, isOpen, selectedOptions])

  useEffect(() => {
    const bottom = outerWrapperRef.current?.getBoundingClientRect().bottom || 0
    setDropdownMaxBlockSize(
      Math.max(window.innerHeight - bottom - 8 * theme.spacer, theme.spacer * 22),
    )
  }, [isOpen, theme.spacer])

  return (
    <OuterWrapper
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onBlur={handleBlur}
      ref={outerWrapperRef}
    >
      <StyledLabel {...labelProps} htmlFor={id}>
        {label}
      </StyledLabel>
      <Wrapper>
        <ScrollContent style={{ flex: `0 0 ${contentWidth}px` }}>
          <OptionWrapper ref={optionWrapperRef}>
            {selectedOptions
              // .slice(0, MAX_ITEMS)
              .map((option) => (
                <Pill
                  onFocus={handlePillFocus}
                  onKeyDown={(e) => handlePillKeyDown(e, option)}
                  onMouseDown={handlePillClick}
                  key={option.key ?? option.value}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {option.label}
                </Pill>
              ))}
            {/* {selectedOptions.length > MAX_ITEMS && (
              <Pill group>+ {selectedOptions.length - MAX_ITEMS}</Pill>
            )} */}
          </OptionWrapper>
          <InputWrapper style={{ minInlineSize: `${inputWidth}px` }}>
            <Input
              type="text"
              id={id}
              value={inputValue}
              placeholder={placeholder}
              onKeyDown={handleInputKeyDown}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              // onClearInput={handleClearInput}
              ref={inputRef}
            />
            <Shadow ref={shadowElRef}>{inputValue}</Shadow>
          </InputWrapper>
        </ScrollContent>
      </Wrapper>
      {isOpen && !!filteredOptions && filteredOptions.length > 0 && (
        <OptionsWrapper {...dropdownProps} style={{ maxBlockSize: `${dropdownMaxBlockSize}px` }}>
          {filteredOptions?.map((option, index) => (
            <SearchSelectOption
              key={option.key ?? option.value}
              isSelected={index === selectedIndex}
              isActive={selectedOptions.includes(option)}
              onClick={(e) => {
                e.stopPropagation()
                handleOptionSelect(option)
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              {...optionProps}
            >
              {option.label}
            </SearchSelectOption>
          ))}
        </OptionsWrapper>
      )}
    </OuterWrapper>
  )
}

interface StyledInputProps {
  hasLabel?: boolean
}

type Status = "success" | "fail" | "neutral"

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
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
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
`

const InputWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  inline-size: 100%;
  transition: min-inline-size 0.1s;
`

const Shadow = styled.span`
  padding-inline: 10px;
  white-space: pre;
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: -1;
`

const Input = styled.input`
  background: transparent;
  padding-inline: 10px;
  position: absolute;
  inset: 0;

  &:focus {
    outline: 0;
  }
`

const Pill = styled.button<{ group?: boolean }>`
  background-color: #ccc;
  border-radius: 2rem;
  flex: ${({ group }) => (group ? "0 0 auto" : "1 0 auto")};
  // max-inline-size: 50%;
  min-inline-size: ${({ group }) => (group ? "none" : "10rem")};
  padding: 0.125rem 1rem;
  margin: 0 ${({ theme }) => 0.5 * theme.spacingBase}rem;
  white-space: nowrap;
  overflow: hidden;

  &:focus {
    background-color: lightblue;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const OptionsWrapper = styled.div`
  position: absolute;
  inset-block-start: 100%;
  inset-inline: 0;
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-block-start: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer}px;
  z-index: ${zIndex.dropdown};
  overflow: auto;
  overscroll-behavior: contain;
`

const OptionWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
`
