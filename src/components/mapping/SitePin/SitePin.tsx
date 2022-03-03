import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"

export interface SitePinProps extends HTMLAttributes<HTMLDivElement> {
  size: Size
}

export const SitePin = forwardRef<HTMLDivElement, SitePinProps>(
  ({ size = "md", ...props }, ref) => {
    return <Wrapper size={size} {...props} ref={ref} />
  },
)

type Size = "sm" | "md"

const Wrapper = styled.div<{ size: Size }>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  background: ${({ theme }) => theme.primitives.color.blue.dark};
  border: 2px solid ${({ theme }) => theme.primitives.color.greyscale.white};
  border-radius: 24px;
`

const getSize = (size: Size) => {
  switch (size) {
    case "md":
      return "20px"
    case "sm":
      return "12px"
    default:
      return "20px"
  }
}
