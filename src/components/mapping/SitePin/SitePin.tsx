import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { primitives } from "../../../primitives/primitives"

interface SitePinProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the pin. Default is `md`. */
  size: Size
}

export const SitePin = forwardRef<HTMLDivElement, SitePinProps>(
  ({ size = "md", ...props }, ref) => {
    return <Wrapper size={size} {...props} ref={ref} />
  },
)

type Size = "sm" | "md"

const Wrapper = styled.div<{ size: Size }>`
  inline-size: ${({ size }) => getSize(size)};
  block-size: ${({ size }) => getSize(size)};
  background: ${primitives.color.blue.dark};
  border: 2px solid ${primitives.color.greyscale.white};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`

const getSize = (size: Size): string => {
  switch (size) {
    case "md":
      return "20px"
    case "sm":
      return "12px"
    default:
      return "20px"
  }
}
