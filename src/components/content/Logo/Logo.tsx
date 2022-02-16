import { forwardRef, SVGAttributes } from "react"
import { LogoLarge } from "./variants/LogoLarge"
import { LogoSmall } from "./variants/LogoSmall"

export interface LogoProps extends SVGAttributes<SVGSVGElement> {
  size?: "small" | "large"
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = "small", ...props }, ref) => {
    if (size === "small") return <LogoSmall ref={ref} {...props} />
    return <LogoLarge ref={ref} {...props} />
  },
)
