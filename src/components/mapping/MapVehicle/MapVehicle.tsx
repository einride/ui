import styled from "@emotion/styled"
import { forwardRef, SVGAttributes } from "react"
import { ConventionalTruckIcon } from "./icons/ConventionalTruckIcon"
import { PodIcon } from "./icons/PodIcon"

export interface MapVehicleProps extends SVGAttributes<SVGSVGElement> {
  /** Vehicle to render. Default is `pod`. */
  icon?: Icon
}

export const MapVehicle = forwardRef<SVGSVGElement, MapVehicleProps>(
  ({ icon = "pod", ...props }, ref) => {
    return <StyledIcon as={getIcon(icon)} {...props} ref={ref} />
  },
)

type Icon = "pod" | "truck"

const StyledIcon = styled.svg`
  filter: drop-shadow(0 2px 2px rgba(18, 18, 18, 0.32));
`

const getIcon = (icon: Icon): React.FunctionComponent => {
  switch (icon) {
    case "pod":
      return PodIcon
    case "truck":
      return ConventionalTruckIcon
    default:
      return PodIcon
  }
}
