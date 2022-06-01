import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ChargerPin } from "../ChargerPin/ChargerPin"
import { SitePin } from "../SitePin/SitePin"

export interface SiteWithChargerPinProps extends HTMLAttributes<HTMLDivElement> {
  /** Default: "md" */
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
  top: 0;
  left: 0;
`

const StyledChargerPin = styled(ChargerPin)<{ size: Size }>`
  position: absolute;
  top: 0;
  right: 0;
`

const Wrapper = styled.div<{ size: Size }>`
  width: ${({ size }) => getWidth(size)};
  height: ${({ size }) => getHeight(size)};
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
