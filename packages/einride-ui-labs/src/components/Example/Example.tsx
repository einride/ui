import { Box } from "@einride/ui"
import { forwardRef } from "react"

export interface ExampleProps {
  /** Example prop. */
  background?: "secondary" | "tertiary"
}

/** An example component. */
export const Example = forwardRef<HTMLDivElement, ExampleProps>(
  ({ background = "secondary", ...props }, ref) => {
    return (
      <Box background={background} {...props} ref={ref}>
        Example
      </Box>
    )
  },
)
