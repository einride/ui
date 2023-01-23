import styled from "@emotion/styled"
import { useScrollIntoView } from "@mantine/hooks"
import {
  useId,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  MutableRefObject,
} from "react"
import { Caption, ContentColor, Icon, useTheme } from "../../../../main"
import { BaseOption } from "../SearchSelect/types"
import { Direction, MultiSelectInputProps, Status } from "./MultiSelect.types"

export const MultiSelectInput = <Option extends BaseOption>({
  clearButtonProps,
  inputProps,
  inputRef,
  inputValue,
  isOpen,
  message,
  onClearClick,
  onFocusToggle,
  onIndexSelect,
  onSearchChange,
  onSelectionChange,
  placeholder = "Search...",
  selectedOptions,
  selectedIndex,
  status,
  ...props
}: MultiSelectInputProps<Option> & { inputRef: RefObject<HTMLInputElement> }): JSX.Element => {
  const id = useId()
  const messageId = useId()

  const theme = useTheme()

  const [inputInlineSize, setInputInlineSize] = useState(0)
  const [contentInlineSize, setContentInlineSize] = useState(0)
  const [direction, setDirection] = useState<Direction>("start")

  const optionWrapperRef = useRef<HTMLInputElement>(null)
  const shadowElRef = useRef<HTMLElement>(null)
  const previousContentInlineSize = useRef(0)
  const pillRefs = useRef<HTMLButtonElement[]>([])

  const { targetRef, scrollIntoView, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
    axis: "x",
  })

  const handleInputChange = (text: string): void => {
    onSearchChange?.(text)
    onSearchChange(text)
    onFocusToggle(true)
    onIndexSelect(null)
  }

  const handleInputFocus = (): void => {
    onFocusToggle(true)
  }

  const handleInputClick = (): void => {
    onIndexSelect(null)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { current } = inputRef
    if (
      (e.key === "ArrowLeft" || e.key === "Backspace") &&
      current?.selectionStart === 0 &&
      current?.selectionEnd === 0
    ) {
      e.preventDefault()
      if (selectedIndex === null) {
        onIndexSelect(selectedOptions.length - 1)
      } else if (selectedIndex > 0) {
        onIndexSelect(selectedIndex - 1)
      }
      setDirection("start")
    }

    if (e.key === "Backspace" && selectedIndex !== null) {
      const newOptions = selectedOptions.filter((selectedOption, index) => index !== selectedIndex)
      onSelectionChange(newOptions)
      onIndexSelect(null)
    }

    if (
      e.key === "ArrowRight" &&
      selectedIndex !== null &&
      selectedIndex < selectedOptions.length - 1
    ) {
      e.preventDefault()
      onIndexSelect(selectedIndex + 1)
      setDirection("end")
    } else if (e.key === "ArrowRight") {
      if (selectedIndex === selectedOptions.length - 1) {
        e.preventDefault()
      }
      onIndexSelect(null)
    }
  }

  const handleClearInput = (e: MouseEvent | KeyboardEvent): void => {
    e.stopPropagation()
    e.preventDefault()
    if (!selectedOptions.length && !inputValue) {
      inputRef.current?.blur()
      onFocusToggle(false)
      const button = e.currentTarget as HTMLButtonElement
      button.blur()
    } else {
      inputRef.current?.focus()
    }
    onSelectionChange([])
    onSearchChange("")
    onSearchChange?.("")
    onClearClick?.()
  }

  /**
   * Focus input field when clicking on component
   * @param e
   */
  const handlePillMouseDown = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
  }

  const handlePillClick = (index: number): void => {
    if (isOpen) {
      onIndexSelect(index)
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

  useLayoutEffect(() => {
    setInputInlineSize(
      Math.max(shadowElRef.current?.offsetWidth || 0, (isOpen ? 8 : 4) * theme.spacer),
    )
  }, [inputValue, isOpen, theme.spacer])

  useLayoutEffect(() => {
    setContentInlineSize((optionWrapperRef.current?.clientWidth || 0) + inputInlineSize)
  }, [inputInlineSize, isOpen, optionWrapperRef, selectedOptions])

  useLayoutEffect(() => {
    if (previousContentInlineSize.current < contentInlineSize || selectedIndex === null) {
      const ref = scrollableRef as MutableRefObject<HTMLDivElement | null>
      ref.current?.scrollTo(contentInlineSize, 0)
    }
    previousContentInlineSize.current = contentInlineSize
  }, [contentInlineSize, scrollableRef, selectedIndex])

  useEffect(() => {
    if (selectedIndex !== null && pillRefs.current[selectedIndex]) {
      targetRef.current = pillRefs.current[selectedIndex]
      scrollIntoView({ alignment: direction })
    }
  }, [selectedIndex, direction, targetRef, scrollIntoView, scrollableRef, contentInlineSize])

  return (
    <>
      {"label" in props && (
        <StyledLabel {...props.labelProps} htmlFor={id} onMouseDown={handleLabelMouseDown}>
          {props.label}
        </StyledLabel>
      )}
      <Wrapper>
        <Scroller ref={scrollableRef}>
          <ScrollContent style={{ flex: `0 0 ${contentInlineSize}px` }}>
            {selectedOptions.length ? (
              <SelectedOptionsWrapper ref={optionWrapperRef}>
                {selectedOptions.map((option, index) => (
                  <Pill
                    onMouseDown={handlePillMouseDown}
                    onClick={() => handlePillClick(index)}
                    key={option.key ?? option.value}
                    isSelected={index === selectedIndex}
                    tabIndex={-1}
                    ref={(node: HTMLButtonElement) => {
                      pillRefs.current[index] = node
                    }}
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
                onClick={handleInputClick}
                // ios doesn't trigger click on focused input element
                onTouchEnd={handleInputClick}
                autoComplete="off"
                ref={inputRef}
                aria-errormessage={status === "fail" && message ? messageId : undefined}
                aria-describedby={status !== "fail" && message ? messageId : undefined}
                aria-invalid={status === "fail"}
                isSelected={selectedIndex === null}
                {...inputProps}
              />
              <Shadow ref={shadowElRef}>{inputValue}</Shadow>
            </InputWrapper>
          </ScrollContent>
        </Scroller>
        {inputValue || selectedOptions.length || isOpen ? (
          <ClearButton
            type="button"
            onClick={handleClearInput}
            onKeyDown={handleClearInput}
            tabIndex={isOpen ? 0 : -1}
            {...clearButtonProps}
          >
            <StyledIcon name="xMark" />
          </ClearButton>
        ) : (
          <ClearButton tabIndex={-1}>
            <StyledPlusIcon name="plus" />
          </ClearButton>
        )}
      </Wrapper>
      {message && (
        <Caption color={getMessageColor(status)} id={messageId}>
          {message}
        </Caption>
      )}
    </>
  )
}

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

interface StyledInputProps {
  hasLabel?: boolean
}

const Wrapper = styled.div<StyledInputProps>`
  position: relative;
  display: flex;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.content.primary};
  inline-size: 100%;
  padding-block: ${({ theme }) => theme.spacingBase}rem;
  padding-inline-end: ${({ theme }) => theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};

  &:focus-within {
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
`

const Scroller = styled.div`
  overflow: auto;
  scrollbar-width: none;
  flex: 1 1 auto;
  padding-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ScrollContent = styled.div`
  display: flex;
  min-inline-size: 100%;
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
  padding-inline-end: ${({ theme }) => theme.spacingBase}rem;
  white-space: pre;
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: -1;
`

const Input = styled.input<{ isSelected: boolean }>`
  background: transparent;
  position: absolute;
  inset: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  ${({ isSelected }) => (!isSelected ? "caret-color: transparent;" : "")};

  &:focus {
    outline: 0;
  }
`

const Pill = styled.button<{ isSelected: boolean }>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background.primaryInverted : theme.colors.background.tertiary};
  ${({ theme, isSelected }) =>
    isSelected ? `color: ${theme.colors.content.primaryInverted}` : ""};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding: ${({ theme }) => 0.5 * theme.spacingBase}rem ${({ theme }) => theme.spacingBase}rem;
  white-space: nowrap;
  overflow: hidden;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
`

const SelectedOptionsWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
  gap: ${({ theme }) => theme.spacingBase}rem;
  margin-inline-start: ${({ theme }) => -1 * theme.spacingBase}rem;
`

const ClearButton = styled.button`
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  flex: 0 0 ${({ theme }) => 3 * theme.spacingBase}rem;
  inset-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledPlusIcon = styled(Icon)`
  flex: 0 0 ${({ theme }) => 3 * theme.spacingBase}rem;
  inset-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  line-height: 1.2em;
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
