import { forwardRef, SVGAttributes } from "react"
import { useColorMode } from "../../../lib/EinrideProvider/EinrideProvider"
import { LogoDefaultLarge } from "./variants/LogoDefaultLarge"
import { LogoDefaultSmall } from "./variants/LogoDefaultSmall"
import { LogoInverseLarge } from "./variants/LogoInverseLarge"
import { LogoInverseSmall } from "./variants/LogoInverseSmall"

export interface LogoProps extends SVGAttributes<SVGSVGElement> {
  size?: "small" | "large"
  variant?: "default" | "inverse"
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = "small", variant, ...props }, ref) => {
    const colorMode = useColorMode()
    const logoDefault = () => {
      if (size === "small") return <LogoDefaultSmall ref={ref} {...props} />
      return <LogoDefaultLarge ref={ref} {...props} />
    }

    const logoInverse = () => {
      if (size === "small") return <LogoInverseSmall ref={ref} {...props} />
      return <LogoInverseLarge ref={ref} {...props} />
    }

    if (variant === "inverse" || (!variant && colorMode === "dark")) {
      return logoInverse()
    }

    return logoDefault()
  },
)
