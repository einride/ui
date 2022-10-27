import { useDisclosure, UseDisclosureHandlers } from "@einride/hooks"
import styled from "@emotion/styled"
import { useClickOutside, useElementSize, useMergedRef } from "@mantine/hooks"
import { ComponentPropsWithRef, createContext, forwardRef, useContext, useMemo } from "react"

interface MenuProviderProps extends ComponentPropsWithRef<"div"> {
  /** Position of the dropdown in relation to the trigger. Default is `bottom-start`. */
  position: Position
}

export const MenuProvider = forwardRef<HTMLDivElement, MenuProviderProps>(
  ({ children, position, ...props }, ref) => {
    const { isOpen, handlers } = useDisclosure(false)
    const { ref: elementSizeRef, height } = useElementSize()
    const clickOutsideRef = useClickOutside(handlers.close)
    const mergedRefs = useMergedRef(ref, clickOutsideRef, elementSizeRef)

    const value = useMemo(
      () => ({
        isOpen,
        handlers,
        height,
        position,
      }),
      [handlers, isOpen, height, position],
    )

    return (
      <Context.Provider value={value}>
        <Wrapper {...props} ref={mergedRefs}>
          {children}
        </Wrapper>
      </Context.Provider>
    )
  },
)

export type Position = "top-start" | "top-end" | "bottom-start" | "bottom-end"

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

interface MenuContext {
  isOpen: boolean
  handlers: UseDisclosureHandlers
  height: number
  position: Position
}

const Context = createContext<MenuContext | null>(null)

export const useMenu = (): MenuContext => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useMenu must be used within <MenuProvider>")
  }
  return context
}
