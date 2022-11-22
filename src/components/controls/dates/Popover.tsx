import { Overlay, usePopover } from "@react-aria/overlays"
import { OverlayTriggerState } from "@react-stately/overlays"
import { ReactNode, RefObject, useRef } from "react"
import { Box } from "../../layout/Box/Box"

interface PopoverProps {
  children: ReactNode
  state: OverlayTriggerState
  triggerRef: RefObject<Element>
}

export const Popover = (props: PopoverProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const { state, children } = props
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state,
  )
  return (
    <Overlay>
      <Box {...underlayProps} style={{ display: "fixed", inset: 0 }} />
      <Box {...popoverProps} marginTop={1} ref={ref}>
        {children}
      </Box>
    </Overlay>
  )
}
