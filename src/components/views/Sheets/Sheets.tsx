import { useMediaQuery } from "@einride/hooks"
import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionStyle } from "framer-motion"
import { forwardRef, ReactNode } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { Theme } from "../../../lib/theme/types"
import { IconButton, IconButtonProps } from "../../controls/buttons/IconButton/IconButton"
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../controls/buttons/PrimaryButton/PrimaryButton"
import {
  SecondaryButton,
  SecondaryButtonProps,
} from "../../controls/buttons/SecondaryButton/SecondaryButton"

export interface SheetsProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
  navigationAction?: (IconButtonProps & { "data-testid"?: string }) | undefined
  navigationTitle?: ReactNode
  overlayStyles?: MotionStyle
  primaryAction?: (PrimaryButtonProps & { "data-testid"?: string }) | undefined
  secondaryAction?: (SecondaryButtonProps & { "data-testid"?: string }) | undefined
  /**
   * Default: md
   */
  size?: Size
  /**
   * Default: true
   */
  withOverlay?: boolean
}

export const Sheets = forwardRef<HTMLDivElement, SheetsProps>(
  (
    {
      children,
      closeHandler,
      isOpen,
      navigationAction,
      navigationTitle,
      overlayStyles = {},
      primaryAction,
      secondaryAction,
      size = "md",
      withOverlay = true,
      ...props
    },
    ref,
  ) => {
    const focusTrapRef = useFocusTrap(isOpen)
    useFocusReturn({ opened: isOpen })
    const mergedRef = useMergedRef(ref, focusTrapRef)
    useScrollLock(isOpen)
    const theme = useTheme()
    const isAboveSm = useMediaQuery(theme.mediaQueries.md)

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {withOverlay && (
              <Overlay
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={closeHandler}
                style={overlayStyles}
              />
            )}
            <Wrapper
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              size={size}
              {...props}
              ref={mergedRef}
            >
              <Navigation>
                <NavigationAction>
                  {navigationAction && <IconButton {...navigationAction} />}
                  {navigationTitle && navigationTitle}
                </NavigationAction>
                {isAboveSm && (
                  <MdLgActions>
                    {secondaryAction && <SecondaryButton {...secondaryAction} />}
                    {primaryAction && <PrimaryButton {...primaryAction} />}
                  </MdLgActions>
                )}
              </Navigation>
              <Content hasPrimaryAction={!!primaryAction} hasSecondaryAction={!!secondaryAction}>
                {children}
              </Content>
              {!isAboveSm && (
                <SmActions>
                  {primaryAction && <PrimaryButton isFullWidth {...primaryAction} />}
                  {secondaryAction && <SecondaryButton isFullWidth {...secondaryAction} />}
                </SmActions>
              )}
            </Wrapper>
          </>
        )}
      </AnimatePresence>
    )
  },
)

type Size = "sm" | "md"

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: 1;
`

const Wrapper = styled(motion.div)<{ size: Size }>`
  position: fixed;
  top: ${({ theme }) => 8 * theme.spacer}px;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-top-left-radius: ${({ theme }) => theme.borderRadii.lg};
  border-top-right-radius: ${({ theme }) => theme.borderRadii.lg};
  // prevent navigation bar from overflowing popover
  overflow: hidden;
  z-index: 2;

  @media ${({ theme }) => theme.mediaQueries.md} {
    top: ${({ theme }) => 2 * theme.spacer}px;
    right: ${({ theme }) => 2 * theme.spacer}px;
    left: unset;
    bottom: ${({ theme }) => 2 * theme.spacer}px;
    border-bottom-left-radius: ${({ theme }) => 2 * theme.spacer}px;
    border-bottom-right-radius: ${({ theme }) => 2 * theme.spacer}px;
    min-width: ${({ size, theme }) =>
      size === "sm"
        ? `calc((300% / 8) - 3 * ${theme.spacer}px)` // to fit grid
        : `calc((100% / 2) - 3 * ${theme.spacer}px)`}; // to fit grid
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    top: ${({ theme }) => 3 * theme.spacer}px;
    right: ${({ theme }) => 3 * theme.spacer}px;
    left: unset;
    bottom: ${({ theme }) => 3 * theme.spacer}px;
    min-width: ${({ size, theme }) =>
      size === "sm"
        ? `calc((100% / 3) - 4 * ${theme.spacer}px)` // to fit grid
        : `calc((100% / 2) - 4.5 * ${theme.spacer}px)`}; // to fit grid
  }
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  z-index: 1; // to cover content with relative positioned elements
`

const NavigationAction = styled.div`
  display: flex;
  gap: ${({ theme }) => 2 * theme.spacer}px;
  align-items: center;
`

const MdLgActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`

const Content = styled.div<{ hasPrimaryAction: boolean; hasSecondaryAction: boolean }>`
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  // make sure content is not hidden when actions are added
  padding-bottom: ${({ hasPrimaryAction, hasSecondaryAction, theme }) =>
    getPaddingBottom(hasPrimaryAction, hasSecondaryAction, theme)}px;
  // fix height to enable setting overflow-y
  height: calc(100% - ${({ theme }) => 10 * theme.spacer}px);
  // when there's more content than room in the popover, it should scroll and not overlow
  overflow-y: auto;

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: ${({ theme }) => 2 * theme.spacer}px;
  }
`

const getPaddingBottom = (
  hasPrimaryAction: boolean,
  hasSecondaryAction: boolean,
  theme: Theme,
): number => {
  if (hasPrimaryAction && hasSecondaryAction) {
    return 18 * theme.spacer
  }

  if (hasPrimaryAction || hasSecondaryAction) {
    return 10 * theme.spacer
  }

  return 2 * theme.spacer
}

const SmActions = styled.nav`
  position: fixed;
  right: ${({ theme }) => 2 * theme.spacer}px;
  left: ${({ theme }) => 2 * theme.spacer}px;
  bottom: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`
