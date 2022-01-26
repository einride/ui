import * as React from "react"
import { forwardRef, HTMLAttributes } from "react"
import logoDefaultLarge from "../../../assets/logo/logo-default-large.svg"
import logoDefaultSmall from "../../../assets/logo/logo-default-small.svg"
import logoInverseLarge from "../../../assets/logo/logo-inverse-large.svg"
import logoInverseSmall from "../../../assets/logo/logo-inverse-small.svg"
import { useColorMode } from "../../../lib/EinrideProvider/EinrideProvider"

export interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  size?: "small" | "large"
  variant?: "default" | "inverse"
}

export const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ size = "small", variant, ...props }, ref) => {
    const colorMode = useColorMode()
    const logoDefault = () => {
      if (size === "small")
        return <img src={logoDefaultSmall} alt="Einride" ref={ref} {...props} />
      return <img src={logoDefaultLarge} alt="Einride" ref={ref} {...props} />
    }

    const logoInverse = () => {
      if (size === "small")
        return <img src={logoInverseSmall} alt="Einride" ref={ref} {...props} />
      return <img src={logoInverseLarge} alt="Einride" ref={ref} {...props} />
    }

    if (variant === "inverse" || (!variant && colorMode === "dark")) {
      return logoInverse()
    }

    return logoDefault()
  },
)
