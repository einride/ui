import { useMediaQuery } from "@einride/hooks"
import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionProps, MotionStyle } from "framer-motion"
import { forwardRef, ReactNode, useEffect } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { Theme } from "../../../lib/theme/types"
import { zIndex } from "../../../lib/zIndex"
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
  /** Content of the sheets. */
  children: ReactNode

  /** Event handler that closes the sheets. Used to make close on Escape or overlay click. */
  closeHandler: () => void

  /** Controls whether sheets should close when clicking outside or not. Default is `true`. */
  closeOnClickOutside?: boolean

  /** Controls whether the sheets is open or not. */
  isOpen: boolean

  /** Navigation action. */
  navigationAction?: (IconButtonProps & { "data-testid"?: string }) | undefined

  /** Navigation title. */
  navigationTitle?: ReactNode

  /** Props passed to the overlay element. */
  overlayProps?: MotionProps

  /** @deprecated since 6.56.0. Use `overlayProps` instead. */
  overlayStyles?: MotionStyle

  /** Primary action of the sheets. */
  primaryAction?: (PrimaryButtonProps & { "data-testid"?: string }) | undefined

  /** Secondary action of the sheets. */
  secondaryAction?: (SecondaryButtonProps & { "data-testid"?: string }) | undefined

  /** Size of the sheets. Default is `md`. */
  size?: Size

  /** Whether or not to show an overlay. Default is `true`. */
  withOverlay?: boolean
}

export const Sheets = forwardRef<HTMLDivElement, SheetsProps>(
  (
    {
      children,
      closeHandler,
      closeOnClickOutside = true,
      isOpen,
      navigationAction,
      navigationTitle,
      overlayProps,
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

    const handleOutsideClick = (): void => {
      if (closeOnClickOutside) {
        closeHandler()
      }
    }

    useEffect(() => {
      const closeOnEscape = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          closeHandler()
        }
      }

      window.addEventListener("keydown", closeOnEscape)
      return () => window.removeEventListener("keydown", closeOnEscape)
    }, [closeHandler])

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {withOverlay && (
              <Overlay
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={handleOutsideClick}
                style={overlayStyles}
                {...overlayProps}
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
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: ${zIndex.overlay};
`

const Wrapper = styled(motion.div)<{ size: Size }>`
  position: fixed;
  inset-block-start: ${({ theme }) => 8 * theme.spacer}px;
  inset-block-end: 0;
  inset-inline: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-start-start-radius: ${({ theme }) => theme.borderRadii.lg};
  border-start-end-radius: ${({ theme }) => theme.borderRadii.lg};
  // prevent navigation bar from overflowing popover
  overflow: hidden;
  z-index: ${zIndex.sheets};

  @media ${({ theme }) => theme.mediaQueries.md} {
    inset-block: ${({ theme }) => 2 * theme.spacer}px;
    inset-inline-end: ${({ theme }) => 2 * theme.spacer}px;
    inset-inline-start: unset;
    border-end-start-radius: ${({ theme }) => 2 * theme.spacer}px;
    border-end-end-radius: ${({ theme }) => 2 * theme.spacer}px;
    inline-size: ${({ size, theme }) =>
      size === "sm"
        ? `calc((300% / 8) - 3 * ${theme.spacer}px)` // to fit grid
        : `calc((100% / 2) - 3 * ${theme.spacer}px)`}; // to fit grid
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    inset-block-start: ${({ theme }) => 3 * theme.spacer}px;
    inset-inline-end: ${({ theme }) => 3 * theme.spacer}px;
    inset-inline-start: unset;
    inset-block-end: ${({ theme }) => 3 * theme.spacer}px;
    inline-size: ${({ size, theme }) =>
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
  inset-block-start: 0;
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
  padding-block-end: ${({ hasPrimaryAction, hasSecondaryAction, theme }) =>
    getPaddingBlockEnd(hasPrimaryAction, hasSecondaryAction, theme)}px;
  // fix height to enable setting overflow-y
  block-size: calc(100% - ${({ theme }) => 10 * theme.spacer}px);
  // when there's more content than room in the popover, it should scroll and not overlow
  overflow-y: auto;

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-block-end: ${({ theme }) => 2 * theme.spacer}px;
  }
`

const getPaddingBlockEnd = (
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
  inset-inline: ${({ theme }) => 2 * theme.spacer}px;
  inset-block-end: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`
