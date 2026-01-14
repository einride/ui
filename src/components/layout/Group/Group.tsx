import { ComponentPropsWithoutRef } from "react"
import { FlexWrap, Gap, JustifyContent } from "../../../lib/theme/props"
import { Box, BoxProps } from "../Box/Box"

export interface GroupProps extends Omit<ComponentPropsWithoutRef<"div">, "color">, BoxProps {
  /** `flex-wrap` CSS property. Default is `wrap`. */
  flexWrap?: FlexWrap

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `start`. */
  justifyContent?: JustifyContent

  ref?: React.Ref<HTMLDivElement> | undefined
}

/** Compose components in a horizontal flex container. */
export const Group = ({
  ref,
  flexWrap = "wrap",
  gap = "md",
  justifyContent = "start",
  ...props
}: GroupProps): React.JSX.Element => {
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
}
