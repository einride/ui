import { AriaDialogProps, useDialog } from "@react-aria/dialog"
import { ReactNode, useRef } from "react"

interface DialogProps extends AriaDialogProps {
  children: ReactNode
}

export const Dialog = ({ children, ...props }: DialogProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const { dialogProps } = useDialog(props, ref)
  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  )
}
