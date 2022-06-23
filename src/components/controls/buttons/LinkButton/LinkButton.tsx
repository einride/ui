import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { ContentColor, Font } from "../../../../lib/theme/types"
import { Link } from "../../../typography/Link/Link"

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  color?: Color
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
