import { useTheme } from "@emotion/react"
import { useLayoutEffect, useState, useRef, RefObject } from "react"
import { BaseOption } from "../../SearchSelect/types"

interface UpdateInputSizeProps<Option> {
  scrollableRef: RefObject<HTMLDivElement>
  isOpen: boolean
  inputValue: string
  selectedOptions: Option[]
  highlightedIndex: number | null
}

interface UpdateInputSizeReturnType {
  inputInlineSize: number
  contentInlineSize: number
  optionsWrapperRef: RefObject<HTMLDivElement>
  shadowElRef: RefObject<HTMLSpanElement>
}

/**
 * Calculate input and option size dependent on its contents.
 * Scroll input field accordingly.
 */
export const useUpdateInputSize = <Option extends BaseOption>({
  scrollableRef,
  isOpen,
  inputValue,
  selectedOptions,
  highlightedIndex,
}: UpdateInputSizeProps<Option>): UpdateInputSizeReturnType => {
  const theme = useTheme()

  const [inputInlineSize, setInputInlineSize] = useState(0)
  const [contentInlineSize, setContentInlineSize] = useState(0)
  const previousContentInlineSize = useRef(0)
  const optionsWrapperRef = useRef<HTMLDivElement>(null)
  const shadowElRef = useRef<HTMLSpanElement>(null)

  // calculate input inline size if input value changes
  useLayoutEffect(() => {
    setInputInlineSize(
      Math.max(shadowElRef.current?.offsetWidth || 0, (isOpen ? 8 : 4) * theme.spacer),
    )
  }, [inputValue, isOpen, theme.spacer, shadowElRef])

  // calculate content inline size if inputInlineSize or selectedOptions change
  useLayoutEffect(() => {
    setContentInlineSize((optionsWrapperRef.current?.clientWidth || 0) + inputInlineSize)
  }, [inputInlineSize, isOpen, optionsWrapperRef, selectedOptions])

  // scroll container to end if new items get added
  useLayoutEffect(() => {
    if (previousContentInlineSize.current < contentInlineSize || highlightedIndex === null) {
      scrollableRef.current?.scrollTo(contentInlineSize, 0)
    }
    previousContentInlineSize.current = contentInlineSize
  }, [contentInlineSize, scrollableRef, highlightedIndex])

  return {
    inputInlineSize,
    contentInlineSize,
    optionsWrapperRef,
    shadowElRef,
  }
}
