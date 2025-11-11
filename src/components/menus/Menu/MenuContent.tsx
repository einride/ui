import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, Fragment } from "react"
import { zIndex } from "../../../lib/zIndex"

interface MenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  /** The preferred alignment against the trigger. May change when collisions occur. Default is `center`. */
  align?: "start" | "center" | "end"

  /** Whether or not to show an overlay. Default is `false`. Doesn't work with `inPortal={false}`. */
  withOverlay?: boolean

  /** Render content within a portal. Default is `true`. */
  inPortal?: boolean

  ref?: React.Ref<HTMLDivElement> | undefined
}

export const MenuContent = ({
  ref,
  children,
  withOverlay,
  inPortal = true,
  ...props
}: MenuContentProps): React.JSX.Element | null => {
  const theme = useTheme()
  const ConditionalPortal = inPortal ? DropdownMenu.Portal : Fragment

  return (
    <ConditionalPortal>
      <Wrapper>
        {withOverlay && inPortal && <MenuOverlay />}
        <StyledContent
          collisionPadding={2 * theme.spacer}
          sideOffset={theme.spacer}
          {...props}
          ref={ref}
        >
          {children}
        </StyledContent>
      </Wrapper>
    </ConditionalPortal>
  )
}

const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: ${zIndex.dropdown - 10}; // below but close to dropdown
`

const Wrapper = styled.div``

const StyledContent = styled(DropdownMenu.Content)`
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.dropdown};
  inline-size: ${({ theme }) => 28 * theme.spacingBase}rem;

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    inline-size: calc(100vi - 4 * ${({ theme }) => theme.spacingBase}rem);
  }
`
