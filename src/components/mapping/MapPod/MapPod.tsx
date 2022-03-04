import styled from "@emotion/styled"
import { forwardRef, SVGAttributes } from "react"
import { PodIcon } from "./PodIcon"

export type MapPodProps = SVGAttributes<SVGSVGElement>

export const MapPod = forwardRef<SVGSVGElement, MapPodProps>((props, ref) => {
  return <StyledPodIcon {...props} ref={ref} />
})

const StyledPodIcon = styled(PodIcon)`
  filter: drop-shadow(0 2px 2px rgba(18, 18, 18, 0.32));
`
