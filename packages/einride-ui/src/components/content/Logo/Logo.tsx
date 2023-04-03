import { ComponentPropsWithoutRef, forwardRef } from "react"
import { LogoLarge } from "./variants/LogoLarge"
import { LogoSmall } from "./variants/LogoSmall"

export interface LogoProps extends ComponentPropsWithoutRef<"svg"> {
  /** Size of the logo. Default is `sm`. */
  size?: Size
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(({ size = "sm", ...props }, ref) => {
  if (size === "sm") return <LogoSmall ref={ref} {...props} />
  if (size === "lg") return <LogoLarge ref={ref} {...props} />
  return <LogoSmall ref={ref} {...props} />
})

type Size = "sm" | "lg"
