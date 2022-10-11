import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { ContentColor, Font } from "../../../../lib/theme/types"
import { Link } from "../../../typography/Link/Link"

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the link. */
  children: ReactNode

  /** Color used in the link. Default is `primary`. */
  color?: Color

  /** Font use in the link. Default is `body`. */
  font?: Font
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ children, color = "primary", font = "body", ...props }, ref) => {
    return (
      <Link as="button" color={color} font={font} {...props} ref={ref}>
        {children}
      </Link>
    )
  },
)

type Color = Extract<ContentColor, "primary" | "secondary">
