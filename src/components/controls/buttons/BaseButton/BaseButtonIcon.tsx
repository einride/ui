import { ReactNode } from "react"
import { Loader } from "../../../feedback/Loader/Loader"
import { Box, BoxProps } from "../../../layout/Box/Box"

export interface BaseButtonIconProps extends BoxProps {
  /** Icon to show in the button. */
  icon: ReactNode

  /** Props passed to the inner wrapper. */
  innerWrapperProps?: BoxProps

  /** Determines whether to show loading spinner or not. */
  isLoading?: boolean
}

export const BaseButtonIcon = ({
  icon,
  innerWrapperProps,
  isLoading,
  ...props
}: BaseButtonIconProps): React.JSX.Element => {
  return (
    <Box marginInlineStart={2} {...props}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          alignItems="center"
          blockSize={3}
          display="flex"
          inlineSize={3}
          justifyContent="center"
          {...innerWrapperProps}
        >
          {icon}
        </Box>
      )}
    </Box>
  )
}
