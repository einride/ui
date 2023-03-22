import { ComponentPropsWithoutRef, forwardRef } from "react"
import { FlexWrap, Gap, JustifyContent } from "@einride/core"
import { Box, BoxProps } from "../Box/Box"

interface GroupProps extends Omit<ComponentPropsWithoutRef<"div">, "color">, BoxProps {
  /** `flex-wrap` CSS property. Default is `wrap`. */
  flexWrap?: FlexWrap

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `start`. */
  justifyContent?: JustifyContent
}

/** Compose components in a horizontal flex container. */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ flexWrap = "wrap", gap = "md", justifyContent = "start", ...props }, ref) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap={flexWrap}
        gap={gap}
        justifyContent={justifyContent}
        {...props}
        ref={ref}
      />
    )
  },
)
