import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from "react"
import { getColor } from "../../../lib/theme/prop-system"
import { ContentColor } from "../../../lib/theme/types"

export interface IconProps extends ComponentPropsWithoutRef<"span"> {
  /** Rendered element. */
  as?: ElementType

  /** Color of the icon. */
  color?: ContentColor

  /** Icon to show. */
  name: IconName
}

// use for example https://mothereff.in/html-entities to convert figma icons to html entities

/** Render icons as text. */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(({ name, color, ...props }, ref) => {
  return (
    <StyledSpan aria-hidden="true" textColor={color} {...props} ref={ref}>
      {getEncodedEntity(name)}
    </StyledSpan>
  )
})

interface StyledSpanProps {
  textColor: ContentColor | undefined
}

const StyledSpan = styled.span<StyledSpanProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
`

export const iconNames = [
  "checkmark",
  "warning",
  "chevronDown",
  "chevronUp",
  "chevronRight",
  "chevronLeft",
  "xMark",
  "arrowUp",
  "arrowDown",
  "arrowRight",
  "arrowLeft",
  "arrowUpCircle",
  "arrowDownCircle",
  "bolt",
  "loupe",
  "plus",
  "minus",
  "ellipsis",
  "plusCircle",
  "minusCircle",
  "arrowClockwise",
  "arrowCounterclockwise",
  "electricTransport",
  "electricFleet",
  "electricAutonomousTransport",
  "intermodalTranport",
  "longhaulTransport",
  "maintenance",
  "remoteOperation",
  "swapping",
  "station",
  "cluster",
  "corridor",
  "routeOptimization",
  "batteryOptimization",
  "autonomousCharging",
  "ondemandCapacity",
  "electrificationAnalysis",
  "emissionAnalysis",
  "crossborder",
  "fossilFree",
  "resilientTransport",
  "circularEconomy",
  "retailCapacity",
  "groceryAndFMCGCapacity",
  "industrialCapacity",
  "customCapacity",
  "mail",
  "CO2",
  "cost",
] as const

export type IconName = (typeof iconNames)[number]

const getEncodedEntity = (name: IconName): ReactNode => {
  if (name === "checkmark") return <>&#10003;</>
  if (name === "warning") return <>&#1049087;</>
  if (name === "chevronDown") return <>&#8964;</>
  if (name === "chevronUp") return <>&#8963;</>
  if (name === "chevronRight") return <>&#707;</>
  if (name === "chevronLeft") return <>&#706;</>
  if (name === "xMark") return <>&#1048964;</>
  if (name === "arrowUp") return <>&#8593;</>
  if (name === "arrowDown") return <>&#8595;</>
  if (name === "arrowRight") return <>&#8594;</>
  if (name === "arrowLeft") return <>&#8592;</>
  if (name === "arrowUpCircle") return <>&#1048694;</>
  if (name === "arrowDownCircle") return <>&#1048696;</>
  if (name === "bolt") return <>&#128498;</>
  if (name === "loupe") return <>&#1049259;</>
  if (name === "plus") return <>&#x10017C;</>
  if (name === "minus") return <>&#x10017D;</>
  if (name === "ellipsis") return <>&#x100360;</>
  if (name === "plusCircle") return <>&#x10004C;</>
  if (name === "minusCircle") return <>&#x10004E;</>
  if (name === "arrowClockwise") return <>&#x100148;</>
  if (name === "arrowCounterclockwise") return <>&#x100149;</>
  if (name === "electricTransport") return <>&#x100743;</>
  if (name === "electricFleet") return <>&#x100745;</>
  if (name === "electricAutonomousTransport") return <>&#x101133;</>
  if (name === "intermodalTranport") return <>&#x100B70;</>
  if (name === "longhaulTransport") return <>&#x100B6F;</>
  if (name === "maintenance") return <>&#x101132;</>
  if (name === "remoteOperation") return <>&#x100657;</>
  if (name === "swapping") return <>&#x101040;</>
  if (name === "station") return <>&#x100D5F;</>
  if (name === "cluster") return <>&#x101165;</>
  if (name === "corridor") return <>&#x100B31;</>
  if (name === "routeOptimization") return <>&#x1009F9;</>
  if (name === "batteryOptimization") return <>&#x100AEF;</>
  if (name === "autonomousCharging") return <>&#x100AEE;</>
  if (name === "ondemandCapacity") return <>&#x100AED;</>
  if (name === "electrificationAnalysis") return <>&#x100F35;</>
  if (name === "emissionAnalysis") return <>&#x10043E;</>
  if (name === "crossborder") return <>&#x1002C9;</>
  if (name === "fossilFree") return <>&#x100200;</>
  if (name === "resilientTransport") return <>&#x100655;</>
  if (name === "circularEconomy") return <>&#x100B0E;</>
  if (name === "retailCapacity") return <>&#x10041B;</>
  if (name === "groceryAndFMCGCapacity") return <>&#x10036A;</>
  if (name === "industrialCapacity") return <>&#x1008CC;</>
  if (name === "customCapacity") return <>&#x1013B5;</>
  if (name === "mail") return <>&#x100356;</>
  if (name === "CO2") return <>&#x1014B9;</>
  if (name === "cost") return <>&#x100598;</>
  return null
}
