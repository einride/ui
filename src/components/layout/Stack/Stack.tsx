import { ComponentPropsWithoutRef } from "react"
import { AlignItems, Gap, JustifyContent } from "../../../lib/theme/props"
import { Box, BoxProps } from "../Box/Box"

export interface StackProps extends Omit<ComponentPropsWithoutRef<"div">, "color">, BoxProps {
  /** `align-items` CSS property. Default is `stretch`. */
  alignItems?: AlignItems

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `center`. */
  justifyContent?: JustifyContent

  ref?: React.Ref<HTMLDivElement> | undefined
}

/** Compose components in a vertical flex container. */
export const Stack = ({
  ref,
  alignItems = "stretch",
  gap = "md",
  justifyContent = "center",
  ...props
}: StackProps): React.JSX.Element => {
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
}
