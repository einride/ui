import { AriaButtonProps, useButton } from "@react-aria/button"
import { useRef } from "react"
import { IconButton } from "../buttons/IconButton/IconButton"

export const PreviousButton = (props: AriaButtonProps<"button">): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  return (
    <IconButton
      icon="arrowLeft"
      variant="tertiary"
      {...buttonProps}
      ref={ref}
      aria-label="Previous month"
    />
  )
}
