import { useScrollIntoView as useMantineScroll } from "@mantine/hooks"
import { RefObject, useEffect } from "react"
import { useTheme } from "./useTheme"

export type Alignment = "start" | "end" | "center"

interface ScrollIntoViewProps<Target> {
  options?: Partial<ScrollIntoOptions>
  alignment: Alignment
  targetRef: Target | null
}

interface ScrollIntoViewReturnType<Parent> {
  scrollableRef: RefObject<Parent>
}

interface ScrollIntoOptions {
  axis: "x" | "y"
  duration: number
  offset: number
  cancelable: boolean
  isList: boolean
}

/**
 * Use mantine scroll-hook to scroll elements into viewport without scrolling body.
 */
export const useScrollIntoView = <Target extends HTMLElement, Parent extends HTMLElement>({
  options = {},
  alignment,
  targetRef,
}: ScrollIntoViewProps<Target>): ScrollIntoViewReturnType<Parent> => {
  const theme = useTheme()
  const defaultOptions: ScrollIntoOptions = {
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
    axis: "y",
  }
  const opts = {
    ...defaultOptions,
    ...options,
  }
  const { targetRef: ref, scrollIntoView, scrollableRef } = useMantineScroll<Target, Parent>(opts)

  useEffect(() => {
    if (targetRef && scrollableRef.current) {
      ref.current = targetRef

      let align = alignment
      // if targetRef is outside of viewport we have to revert the alignment
      const targetRect = ref.current.getBoundingClientRect()
      const parentRect = scrollableRef.current.getBoundingClientRect()
      const start = opts.axis === "x" ? "left" : "top"
      const end = opts.axis === "x" ? "right" : "bottom"

      const outsideAbove = targetRect[start] < parentRect[start]
      const outsideBelow = targetRect[end] > parentRect[end]

      if (alignment === "end" && outsideAbove) {
        // targetRef is above viewport
        align = "start"
      } else if (alignment === "start" && outsideBelow) {
        // targetRef is below viewport
        align = "end"
      }
      scrollIntoView({ alignment: align })
    }
  }, [ref, scrollIntoView, alignment, targetRef, opts.axis, scrollableRef])

  return {
    scrollableRef,
  }
}
