import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { ContentColor, Font } from "../../../../lib/theme/types"
import { Link } from "../../../typography/Link/Link"

export interface LinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Rendered element. */
  as?: ElementType

  /** Content of the link. */
  children: ReactNode

  /** Color used in the link. */
  color?: Color

  /** Font use in the link. */
  font?: Font

  ref?: React.Ref<HTMLButtonElement> | undefined
}

/** Sometimes, you want a button to behave like a link—i.e. navigate to another URL on click. Use `<LinkButton>` for those cases to make that possible while keeping correct semantics. */
export const LinkButton = ({ ref, children, ...props }: LinkButtonProps): React.JSX.Element => {
  return (
    <Link as="button" {...props} ref={ref}>
      {children}
    </Link>
  )
}

type Color = Extract<ContentColor, "primary" | "secondary">
