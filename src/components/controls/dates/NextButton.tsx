import { AriaButtonProps, useButton } from "@react-aria/button"
import { useRef } from "react"
import { IconButton } from "../buttons/IconButton/IconButton"

export const NextButton = (props: AriaButtonProps<"button">): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  return (
    <IconButton
      icon="arrowRight"
      variant="tertiary"
      {...buttonProps}
      ref={ref}
      aria-label="Next month"
    />
  )
}
