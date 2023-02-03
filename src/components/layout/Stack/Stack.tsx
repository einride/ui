import { ComponentPropsWithoutRef, forwardRef } from "react"
import { AlignItems, Gap, JustifyContent } from "../../../lib/theme/props"
import { Box, BoxProps } from "../Box/Box"

interface StackProps extends Omit<ComponentPropsWithoutRef<"div">, "color">, BoxProps {
  /** `align-items` CSS property. Default is `stretch`. */
  alignItems?: AlignItems

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `center`. */
  justifyContent?: JustifyContent
}

/** Compose components in a vertical flex container. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ alignItems = "stretch", gap = "md", justifyContent = "center", ...props }, ref) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems={alignItems}
        gap={gap}
        justifyContent={justifyContent}
        {...props}
        ref={ref}
      />
    )
  },
)
