import styled from "@emotion/styled"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { ComponentPropsWithoutRef, ReactNode, useId } from "react"
import { Group } from "../../../layout/Group/Group"

export interface SwitchBaseProps {
  /** Switch state when controlled. */
  checked?: boolean

  /** Default switch state when uncontrolled. */
  defaultChecked?: boolean

  /** Event handler called when the state of the switch changes. */
  onCheckedChange?: (checked: boolean) => void
}

interface SwitchWithLabelProps {
  /** Switch label. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface SwitchWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type SwitchProps = SwitchBaseProps & (SwitchWithLabelProps | SwitchWithoutLabelProps)

export const Switch = ({ ...props }: SwitchProps): JSX.Element => {
  const id = useId()
  return (
    <Group alignItems="center" gap="sm">
      {"label" in props && <StyledLabel htmlFor={id}>{props.label}</StyledLabel>}
      <Root {...props} id={id}>
        <SwitchPrimitive.Thumb asChild>
          <OuterThumb>
            <InnerThumb data-anatomy="inner-thumb" />
          </OuterThumb>
        </SwitchPrimitive.Thumb>
      </Root>
    </Group>
  )
}

const StyledLabel = styled.label``

const Root = styled(SwitchPrimitive.Root)`
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 12 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};

  &:is(:hover, :focus-visible) [data-anatomy="inner-thumb"] {
    transform: scale(1.5);
  }

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`

const OuterThumb = styled.div`
  display: block;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.primaryInverted};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  display: flex;
  justify-content: end;
  align-items: center;
  transition-property: background, inline-size;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};

  &[data-state="checked"] {
    inline-size: ${({ theme }) => 12 * theme.spacingBase}rem;
    background: ${({ theme }) => theme.colors.content.positive};
  }
`

const InnerThumb = styled.div`
  block-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  inline-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  margin-inline-end: ${({ theme }) => theme.spacing.sm};
  transition-property: transform;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};
`
