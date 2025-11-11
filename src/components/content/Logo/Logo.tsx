import { ComponentPropsWithoutRef } from "react"
import { LogoLarge } from "./variants/LogoLarge"
import { LogoSmall } from "./variants/LogoSmall"

export interface LogoProps extends ComponentPropsWithoutRef<"svg"> {
  /** Size of the logo. Default is `sm`. */
  size?: Size

  ref?: React.Ref<SVGSVGElement> | undefined
}

/** Einride's official logo. */
export const Logo = ({ ref, size = "sm", ...props }: LogoProps): React.JSX.Element => {
  if (size === "sm") return <LogoSmall ref={ref} {...props} />
  if (size === "lg") return <LogoLarge ref={ref} {...props} />
  return <LogoSmall ref={ref} {...props} />
}

type Size = "sm" | "lg"
