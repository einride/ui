import styled from "@emotion/styled"
import { useMergedRef } from "@mantine/hooks"
import {
  CSSProperties,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
} from "react"
import { ContentColor } from "../../../../lib/theme/types"
import { Caption } from "../../../typography/Caption/Caption"
import { SearchSelectInput } from "./SearchSelectInput"
import { SearchSelectOption } from "./SearchSelectOption"

export interface SearchSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  "aria-label": string
  isFullWidth?: boolean
  label?: ReactNode
  message?: ReactNode
  onOptionSelect?: (option: Option) => void
  onSearchChange?: (value: string) => void
  options: Option[]
  status?: Status
  wrapperStyles?: CSSProperties
}

export const SearchSelect = forwardRef<HTMLInputElement, SearchSelectProps>(
  (
    {
      isFullWidth = false,
      message,
      onOptionSelect,
      onSearchChange,
      options,
      placeholder = "Search...",
      status,
      value,
      wrapperStyles = {},
      ...props
    },
    ref,
  ): JSX.Element => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(true)
    const internalInputRef = useRef<HTMLInputElement>(null)
    const optionRef = useRef<HTMLInputElement>(null)
    const inputRef = useMergedRef(internalInputRef, ref)

    const handleInputBlur = (): void => {
      if (typeof selectedIndex === "number") {
        const selected = options[selectedIndex]
        onSearchChange?.(selected?.value)
        onOptionSelect?.(selected)
        internalInputRef?.current?.focus()
      }
      setIsOpen(false)
    }

    const handleInputChange = (text: string): void => {
      onSearchChange?.(text)
      setSelectedIndex(0)
      setIsOpen(true)
    }

    const handleInputClick = (): void => {
      setIsOpen(true)
    }

    const handleInputFocus = (): void => {
      setIsOpen(true)
    }

    const handleOptionSelect = (option: Option): void => {
      onSearchChange?.(option.value)
      onOptionSelect?.(option)
      internalInputRef?.current?.focus()
      setIsOpen(false)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (typeof selectedIndex === "number") {
          handleOptionSelect(options[selectedIndex])
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        if (isOpen) {
          if (selectedIndex === null) {
            setSelectedIndex(0)
          } else if (selectedIndex < options.length - 1) {
            setSelectedIndex(selectedIndex + 1)
          }
        } else {
          setIsOpen(true)
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
    }

    const handleMouseOver = (index: number): void => {
      setSelectedIndex(index)
    }

    const handleMouseLeave = (): void => {
      setSelectedIndex(null)
    }

    return (
      <Wrapper isFullWidth={isFullWidth} style={wrapperStyles}>
        <SearchSelectInput
          isFullWidth={isFullWidth}
          isOpen={isOpen}
          onBlur={handleInputBlur}
          onChange={(e) => handleInputChange(e.target.value)}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          value={value?.toString()}
          {...props}
          ref={inputRef}
        />
        {isOpen && options.length > 0 && (
          <OptionsWrapper>
            {options.map((option, index) => (
              <SearchSelectOption
                key={option.value}
                isSelected={index === selectedIndex}
                onClick={() => handleOptionSelect(option)}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
                ref={optionRef}
              >
                {option.label}
              </SearchSelectOption>
            ))}
          </OptionsWrapper>
        )}
        {message && <Caption color={getMessageColor(status)}>{message}</Caption>}
      </Wrapper>
    )
  },
)

interface Option {
  label: ReactNode
  value: string
}

type Status = "success" | "fail" | "neutral"

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

const Wrapper = styled.div<{ isFullWidth?: boolean }>`
  display: inline-block;
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
`

const OptionsWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.spacer}px;
  margin-top: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer}px;
`
