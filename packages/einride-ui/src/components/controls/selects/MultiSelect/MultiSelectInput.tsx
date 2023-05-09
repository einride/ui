import styled from "@emotion/styled"
import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useScrollIntoView } from "../../../../hooks/useScrollIntoView"
import { ContentColor } from "../../../../lib/theme/types"
import { Icon } from "../../../content/Icon/Icon"
import { Caption } from "../../../typography/Caption/Caption"
import { MessageProps } from "../../inputs/BaseInput/BaseInput"
import { useUpdateInputSize } from "./hooks/useUpdateInputSize"
import {
  BaseOption,
  MultiSelectWithLabelProps,
  MultiSelectWithoutLabelProps,
  Status,
} from "./types"

interface MultiSelectInputBaseProps<Option> {
  /** Unique ID. */
  id: string

  /** Reflects state of the dropdown. */
  isOpen: boolean

  /** Callback for onFocus/onBlur. */
  onFocusToggle: (isOpen: boolean) => void

  /** Set highlighted index within selected options. */
  onIndexHighlight: (index: number | null) => void

  /** Highlighted index within selected options. */
  highlightedIndex: number | null

  /** Options filtered by search term. */
  filteredOptions: Option[]

  /** Options selected by user. Default is `[]` */
  selectedOptions?: Option[] | undefined

  /** Search term (controlled). */
  inputValue: string
}

export interface MultiSelectInputSharedProps<Option> {
  /** Input placeholder. */
  placeholder?: string

  /** Default is `neutral`. */
  status?: Status

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: MessageProps

  /** Props passed to the input element. */
  inputProps?: ComponentPropsWithoutRef<"input"> & { "data-testid": string }

  /** Props passed to the clear button element. */
  clearButtonProps?: ComponentPropsWithoutRef<"button"> & { "data-testid": string }

  /** Limit the number of options to be displayed within the input field. Default is 3. */
  maxOptionsShown?: number

  /** Callback called when the input field is updated. */
  onSearchChange: (value: string) => void

  /** Callback called when the selection changes. */
  onSelectionChange: (options: Option[]) => void

  /** Callback called when the clear button is clicked. */
  onClearClick?: () => void
}

type MultiSelectInputProps<Option> = MultiSelectInputBaseProps<Option> &
  MultiSelectInputSharedProps<Option> &
  (MultiSelectWithLabelProps | MultiSelectWithoutLabelProps)

export const MultiSelectInput = <Option extends BaseOption>({
  clearButtonProps,
  highlightedIndex,
  inputProps,
  inputRef,
  inputValue,
  isOpen,
  id,
  message,
  messageProps,
  maxOptionsShown = 3,
  onClearClick,
  onFocusToggle,
  onIndexHighlight,
  onSearchChange,
  onSelectionChange,
  placeholder = "Search...",
  selectedOptions = [],
  status,
  ...props
}: MultiSelectInputProps<Option> & {
  inputRef: RefObject<HTMLInputElement>
}): React.JSX.Element => {
  const messageId = useId()
  const pillRefs = useRef<HTMLButtonElement[]>([])
  const [conditionalMaxOptions, setConditionalMaxOptions] = useState<number | undefined>(
    maxOptionsShown,
  )

  useLayoutEffect(() => {
    setConditionalMaxOptions(isOpen ? undefined : maxOptionsShown)
  }, [maxOptionsShown, isOpen])

  const getTargetRef = (index: number | null): HTMLButtonElement | null => {
    if (index !== null && pillRefs.current[index]) {
      return pillRefs.current[index] as HTMLButtonElement
    }
    return null
  }

  const { scrollableRef, scrollIntoView, targetRef } = useScrollIntoView<
    HTMLButtonElement,
    HTMLDivElement
  >({
    axis: "x",
  })

  const { inputInlineSize, contentInlineSize, optionsWrapperRef, shadowElRef } = useUpdateInputSize(
    {
      scrollableRef,
      isOpen,
      inputValue,
      selectedOptions,
      highlightedIndex,
    },
  )

  const handleInputChange = (text: string): void => {
    onSearchChange?.(text)
    onSearchChange(text)
    onFocusToggle(true)
    onIndexHighlight(null)
  }

  const handleInputFocus = (): void => {
    onFocusToggle(true)
  }

  const handleInputClick = (): void => {
    onIndexHighlight(null)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { current } = inputRef
    if (
      (e.key === "ArrowLeft" || e.key === "Backspace") &&
      current?.selectionStart === 0 &&
      current?.selectionEnd === 0
    ) {
      e.preventDefault()
      let newIndex = null
      if (highlightedIndex === null) {
        newIndex = selectedOptions.length - 1
        onIndexHighlight(newIndex)
      } else if (highlightedIndex > 0) {
        newIndex = highlightedIndex - 1
        onIndexHighlight(newIndex)
      }
      targetRef.current = getTargetRef(newIndex)
      scrollIntoView({ alignment: "start" })
    }

    if (e.key === "Backspace" && highlightedIndex !== null) {
      const newOptions = selectedOptions.filter((_, index) => index !== highlightedIndex)
      onSelectionChange(newOptions)
      onIndexHighlight(null)
    }

    if (
      e.key === "ArrowRight" &&
      highlightedIndex !== null &&
      highlightedIndex < selectedOptions.length - 1
    ) {
      e.preventDefault()
      const newIndex = highlightedIndex + 1
      onIndexHighlight(newIndex)
      targetRef.current = getTargetRef(newIndex)
      scrollIntoView({ alignment: "end" })
    } else if (e.key === "ArrowRight") {
      if (highlightedIndex === selectedOptions.length - 1) {
        e.preventDefault()
      }
      onIndexHighlight(null)
    }
  }

  const handleClearInput = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ): void => {
    e.stopPropagation()
    e.preventDefault()
    if (!selectedOptions.length && !inputValue) {
      inputRef.current?.blur()
      onFocusToggle(false)
      const button = e.currentTarget
      button.blur()
    } else {
      inputRef.current?.focus()
    }
    onSelectionChange([])
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
      onIndexHighlight(index)
    }
  }

  /**
   * Don't blur input field on click
   * @param e
   */
  const preventBlur = (e: MouseEvent<HTMLElement>): void => {
    if (isOpen) {
      e.preventDefault()
    }
  }

  const getInputRightIcon = (): React.JSX.Element => {
    if (status === "success" && !isOpen) {
      return <PositiveIcon name="checkmark" />
    }
    if (status === "fail" && !isOpen) {
      return <NegativeIcon name="warning" />
    }
    if (inputValue || selectedOptions.length || isOpen) {
      return (
        <ClearButton
          type="button"
          onClick={handleClearInput}
          onKeyDown={handleClearInput}
          onMouseDown={preventBlur}
          tabIndex={isOpen ? 0 : -1}
          aria-controls={id}
          aria-label="Clear input"
          {...clearButtonProps}
        >
          <StyledIcon name="xMark" />
        </ClearButton>
      )
    }
    return (
      <ClearButton tabIndex={-1}>
        <StyledPlusIcon name="plus" />
      </ClearButton>
    )
  }

  return (
    <>
      {"label" in props && (
        <StyledLabel {...props.labelProps} htmlFor={id} onMouseDown={preventBlur}>
          {props.label}
        </StyledLabel>
      )}
      <Wrapper
        role="combobox"
        aria-haspopup
        aria-expanded={isOpen}
        aria-controls={`options-${id}`}
        hasLabel={"label" in props}
      >
        <Scroller ref={scrollableRef}>
          <ScrollContent style={{ flexBasis: `${contentInlineSize}px` }}>
            {selectedOptions.length ? (
              <SelectedOptionsWrapper ref={optionsWrapperRef} hasLabel={"label" in props}>
                {selectedOptions.slice(0, conditionalMaxOptions).map((option, index) => (
                  <Pill
                    onMouseDown={handlePillMouseDown}
                    onClick={() => handlePillClick(index)}
                    key={option.value}
                    isSelected={index === highlightedIndex}
                    aria-selected
                    tabIndex={-1}
                    ref={(node: HTMLButtonElement) => {
                      pillRefs.current[index] = node
                    }}
                  >
                    {option.inputValue ?? option.value}
                  </Pill>
                ))}
                {typeof conditionalMaxOptions === "number" &&
                  selectedOptions.length > conditionalMaxOptions && (
                    <Pill>+{selectedOptions.length - conditionalMaxOptions}</Pill>
                  )}
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
                autoCorrect="off"
                ref={inputRef}
                aria-errormessage={status === "fail" && message ? messageId : undefined}
                aria-describedby={status !== "fail" && message ? messageId : undefined}
                aria-invalid={status === "fail"}
                isSelected={highlightedIndex === null}
                {...inputProps}
              />
              <Shadow ref={shadowElRef}>{inputValue}</Shadow>
            </InputWrapper>
          </ScrollContent>
        </Scroller>
        {getInputRightIcon()}
      </Wrapper>
      {message && (
        <Caption color={getMessageColor(status)} {...messageProps} id={messageId}>
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

interface WrapperProps {
  hasLabel?: boolean
}

interface SelectionProps {
  isSelected?: boolean
}

const Wrapper = styled.div<WrapperProps>`
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
  border-radius: ${({ hasLabel, theme }) =>
    hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

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
  flex-grow: 0;
  flex-shrink: 0;
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

const Input = styled.input<SelectionProps>`
  background: transparent;
  position: absolute;
  inset: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  ${({ isSelected }) => (!isSelected ? "caret-color: transparent;" : "")};
  inline-size: 100%;

  &:focus {
    outline: 0;
  }
`

const Pill = styled.button<SelectionProps>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background.primaryInverted : theme.colors.background.tertiary};
  ${({ theme, isSelected }) =>
    isSelected ? `color: ${theme.colors.content.primaryInverted}` : ""};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding: ${({ theme }) => 0.5 * theme.spacingBase}rem ${({ theme }) => theme.spacingBase}rem;
  white-space: nowrap;
`

const SelectedOptionsWrapper = styled.div<WrapperProps>`
  display: flex;
  flex: 0 1 auto;
  gap: ${({ theme }) => theme.spacingBase}rem;
  margin-inline-start: ${({ theme, hasLabel }) => hasLabel && `${-1 * theme.spacingBase}rem`};
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
const StyledPlusIcon = styled(StyledIcon)`
  line-height: 1.2em;
`

const PositiveIcon = styled(StyledIcon)`
  color: ${({ theme }) => theme.colors.content.positive};
`

const NegativeIcon = styled(StyledIcon)`
  color: ${({ theme }) => theme.colors.content.negative};
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
