import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ChargerPin } from "../ChargerPin/ChargerPin"
import { SitePin } from "../SitePin/SitePin"

export interface SiteWithChargerPinProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the pin. Default is `md`. */
  size: Size
}

export const SiteWithChargerPin = forwardRef<HTMLDivElement, SiteWithChargerPinProps>(
  ({ size = "md", ...props }, ref) => {
    return (
      <Wrapper size={size} {...props} ref={ref}>
        <StyledSitePin size={size} />
        <StyledChargerPin size={size} />
      </Wrapper>
    )
  },
)

type Size = "sm" | "md"

const StyledSitePin = styled(SitePin)<{ size: Size }>`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
`

const StyledChargerPin = styled(ChargerPin)<{ size: Size }>`
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
`

const Wrapper = styled.div<{ size: Size }>`
  inline-size: ${({ size }) => getWidth(size)};
  block-size: ${({ size }) => getHeight(size)};
  position: relative;
`

const getWidth = (size: Size): string => {
  switch (size) {
    case "md":
      return "32px"
    case "sm":
      return "20px"
    default:
      return "32px"
  }
}

const getHeight = (size: Size): string => {
  switch (size) {
    case "md":
      return "20px"
    case "sm":
      return "12px"
    default:
      return "20px"
  }
}
