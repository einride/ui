import { useScrollIntoView as useMantineScroll } from "@mantine/hooks"
import { RefObject, useEffect } from "react"
import { useTheme } from "../../../../../main"
import { Direction } from "../types"

interface ScrollIntoViewProps<Target> {
  axis: "x" | "y"
  direction: Direction
  targetRef: Target | null
}

interface ScrollIntoViewReturnType<Parent> {
  scrollableRef: RefObject<Parent>
}

/**
 * Use mantine scroll-hook to scroll elements into viewport without scrolling body.
 */
export const useScrollIntoView = <Target extends HTMLElement, Parent extends HTMLElement>({
  axis,
  direction,
  targetRef,
}: ScrollIntoViewProps<Target>): ScrollIntoViewReturnType<Parent> => {
  const theme = useTheme()
  const {
    targetRef: ref,
    scrollIntoView,
    scrollableRef,
  } = useMantineScroll<Target, Parent>({
    duration: 0,
    offset: theme.spacer,
    cancelable: false,
    isList: true,
    axis,
  })

  useEffect(() => {
    if (targetRef) {
      ref.current = targetRef

      let alignment = direction

      // if targetRef is outside of viewport we have to revert the direction
      const targetRect = ref.current.getBoundingClientRect()
      const parentRect = scrollableRef.current.getBoundingClientRect()
      const start = axis === "x" ? "left" : "top"
      const end = axis === "x" ? "right" : "bottom"

      const outsideAbove = targetRect[start] < parentRect[start]
      const outsideBelow = targetRect[end] > parentRect[end]

      if (direction === "end" && outsideAbove) {
        // targetRef is above viewport
        alignment = "start"
      } else if (direction === "start" && outsideBelow) {
        // targetRef is below viewport
        alignment = "end"
      }
      scrollIntoView({ alignment })
    }
  }, [ref, scrollIntoView, direction, targetRef, axis, scrollableRef])

  return {
    scrollableRef,
  }
}
