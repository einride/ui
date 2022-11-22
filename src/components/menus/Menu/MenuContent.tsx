import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { zIndex } from "../../../lib/zIndex"

interface MenuContentProps extends ComponentPropsWithoutRef<"div"> {
  /** The preferred alignment against the trigger. May change when collisions occur. Default is `center`. */
  align?: "start" | "center" | "end"
}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, ...props }, forwardedRef): JSX.Element | null => {
    const theme = useTheme()

    return (
      <DropdownMenu.Portal>
        <Wrapper>
          <StyledContent
            collisionPadding={2 * theme.spacer}
            sideOffset={theme.spacer}
            {...props}
            ref={forwardedRef}
          >
            {children}
          </StyledContent>
        </Wrapper>
      </DropdownMenu.Portal>
    )
  },
)

const Wrapper = styled.div`
  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    [data-radix-popper-content-wrapper] {
      transform: none !important; // take control over dropdown position on sm viewport
    }
  }
`

const StyledContent = styled(DropdownMenu.Content)`
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.dropdown};

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    position: fixed;
    inset-block-end: ${({ theme }) => 2 * theme.spacer}px;
    inset-inline: ${({ theme }) => 2 * theme.spacer}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ theme }) => 28 * theme.spacingBase}rem;
  }
`
