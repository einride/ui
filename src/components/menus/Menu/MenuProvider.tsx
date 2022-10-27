import { useDisclosure, UseDisclosureHandlers } from "@einride/hooks"
import styled from "@emotion/styled"
import { useClickOutside, useElementSize, useMergedRef } from "@mantine/hooks"
import { ComponentPropsWithoutRef, createContext, forwardRef, useContext, useMemo } from "react"

interface MenuProviderProps extends ComponentPropsWithoutRef<"div"> {
  /** Position of the dropdown in relation to the trigger. Default is `bottom-start`. */
  dropdownPosition: DropdownPosition
}

export const MenuProvider = forwardRef<HTMLDivElement, MenuProviderProps>(
  ({ children, dropdownPosition, ...props }, ref) => {
    const { isOpen, handlers } = useDisclosure(false)
    const { ref: elementSizeRef, height } = useElementSize()
    const clickOutsideRef = useClickOutside(handlers.close)
    const mergedRefs = useMergedRef(ref, clickOutsideRef, elementSizeRef)

    const value = useMemo(
      () => ({
        dropdownPosition,
        isOpen,
        handlers,
        height,
      }),
      [dropdownPosition, isOpen, handlers, height],
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

export type DropdownPosition = "top-start" | "top-end" | "bottom-start" | "bottom-end"

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

interface MenuContext {
  dropdownPosition: DropdownPosition
  isOpen: boolean
  handlers: UseDisclosureHandlers
  height: number
}

const Context = createContext<MenuContext | null>(null)

export const useMenu = (): MenuContext => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useMenu must be used within <MenuProvider>")
  }
  return context
}
