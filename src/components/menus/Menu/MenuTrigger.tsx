import { cloneElement, ComponentPropsWithoutRef, forwardRef, Fragment, ReactElement } from "react"
import { useMenu } from "./MenuProvider"

type MenuTriggerProps = ComponentPropsWithoutRef<"div">

export const MenuTrigger = forwardRef<HTMLDivElement, MenuTriggerProps>(
  ({ children, ...props }, ref) => {
    if (!isElement(children)) {
      throw new Error("MenuTrigger's children must be a valid element that accepts a ref.")
    }
    const { handlers } = useMenu()
    const onClick = (): void => {
      handlers.toggle()
    }

    return cloneElement(children, {
      onClick,
      ...props,
      ref,
    })
  },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isElement = (value: any): value is ReactElement => {
  if (Array.isArray(value) || value === null) {
    return false
  }

  if (typeof value === "object") {
    if (value.type === Fragment) {
      return false
    }

    return true
  }

  return false
}
