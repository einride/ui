import { useScrollIntoView as useMantineScroll } from "@mantine/hooks"
import { RefObject, useCallback } from "react"
import { useTheme } from "./useTheme"

export type Alignment = "start" | "end" | "center"
type ScrollIntoViewArgs = { alignment: Alignment }

interface ScrollIntoViewReturnType<Target, Parent> {
  scrollableRef: RefObject<Parent>
  targetRef: React.MutableRefObject<Target | null>
  scrollIntoView: ({ alignment }: ScrollIntoViewArgs) => void
}

interface ScrollIntoOptions {
  axis: "x" | "y"
  duration: number
  offset: number
  cancelable: boolean
  isList: boolean
}

/**
 * This hook functions as a proxy to solve alignment problems with mantine-hook.
 *
 * Mantine scroll-hook enables scrolling elements without scrolling the body.
 * However the alignment must be calculated as elements outside of the scroll area are not handled well.
 */
export const useScrollIntoView = <Target extends HTMLElement, Parent extends HTMLElement>(
  options: Partial<ScrollIntoOptions> = {},
): ScrollIntoViewReturnType<Target, Parent> => {
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
  const {
    scrollIntoView: mantineScrollIntoView,
    scrollableRef,
    targetRef,
  } = useMantineScroll<Target, Parent>(opts)

  const scrollIntoView = useCallback(
    ({ alignment }: ScrollIntoViewArgs) => {
      if (targetRef.current && scrollableRef.current) {
        let align = alignment
        // if targetRef is outside of viewport we have to revert the alignment
        const targetRect = targetRef.current.getBoundingClientRect()
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
        mantineScrollIntoView({ alignment: align })
      }
    },
    [scrollableRef, targetRef, opts.axis, mantineScrollIntoView],
  )

  return {
    targetRef,
    scrollableRef,
    scrollIntoView,
  }
}
