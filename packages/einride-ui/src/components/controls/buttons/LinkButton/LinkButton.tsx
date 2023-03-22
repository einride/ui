import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { ContentColor, Font } from "@einride/core"
import { Link } from "../../../typography/Link/Link"

interface LinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the link. */
  children: ReactNode

  /** Color used in the link. */
  color?: Color

  /** Font use in the link. */
  font?: Font
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Link as="button" {...props} ref={ref}>
        {children}
      </Link>
    )
  },
)

type Color = Extract<ContentColor, "primary" | "secondary">
