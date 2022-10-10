import { useMediaQuery } from "@einride/hooks"
import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionStyle } from "framer-motion"
import { forwardRef, ReactNode, useEffect } from "react"
import { useTheme } from "../../../hooks/useTheme"
import { Theme } from "../../../lib/theme/types"
import { IconButton, IconButtonProps } from "../../controls/buttons/IconButton/IconButton"
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"

export interface PopoverProps extends Omit<HTMLMotionProps<"div">, "title"> {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
  navigationAction?: (IconButtonProps & { "data-testid"?: string }) | undefined
  navigationTitle?: ReactNode
  overlayStyles?: MotionStyle
  primaryAction?: (PopoverAction & { "data-testid"?: string }) | undefined
  secondaryAction?: (PopoverAction & { "data-testid"?: string }) | undefined
}

/** @deprecated Since version 6.14.0. Use `<Alert>` or `<Sheets>` instead. */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
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

    const closeOnEscapePress = (event: KeyboardEvent): void => {
      if (event.code === "Escape") {
        closeHandler()
      }
    }

    useEffect(() => {
      window.addEventListener("keydown", closeOnEscapePress)
      return () => window.removeEventListener("keydown", closeOnEscapePress)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeHandler}
              style={overlayStyles}
            />
            <Wrapper
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
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
                    {secondaryAction && (
                      <SecondaryButton {...secondaryAction} onClick={secondaryAction.handler}>
                        {secondaryAction.text}
                      </SecondaryButton>
                    )}
                    {primaryAction && (
                      <PrimaryButton
                        {...primaryAction}
                        data-autofocus
                        onClick={primaryAction.handler}
                      >
                        {primaryAction.text}
                      </PrimaryButton>
                    )}
                  </MdLgActions>
                )}
              </Navigation>
              <Content hasPrimaryAction={!!primaryAction} hasSecondaryAction={!!secondaryAction}>
                {children}
              </Content>
              {!isAboveSm && (
                <SmActions>
                  {primaryAction && (
                    <PrimaryButton
                      {...primaryAction}
                      data-autofocus
                      isFullWidth
                      onClick={primaryAction.handler}
                    >
                      {primaryAction.text}
                    </PrimaryButton>
                  )}
                  {secondaryAction && (
                    <SecondaryButton
                      {...secondaryAction}
                      isFullWidth
                      onClick={secondaryAction.handler}
                    >
                      {secondaryAction.text}
                    </SecondaryButton>
                  )}
                </SmActions>
              )}
            </Wrapper>
          </>
        )}
      </AnimatePresence>
    )
  },
)
export interface PopoverAction extends Omit<PrimaryButtonProps, "children"> {
  handler?: () => void
  text: ReactNode
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: 1;
`

const Wrapper = styled(motion.div)`
  position: fixed;
  inset-block-start: ${({ theme }) => 10 * theme.spacer}px;
  inset-block-end: 0;
  inset-inline: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-start-start-radius: ${({ theme }) => theme.borderRadii.lg};
  border-start-end-radius: ${({ theme }) => theme.borderRadii.lg};
  // prevent navigation bar from overflowing popover
  overflow: hidden;
  z-index: 2;

  @media ${({ theme }) => theme.mediaQueries.md} {
    inset-block-start: 0;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    inline-size: max(50vw, ${({ theme }) => theme.breakpoints.md - 4 * theme.spacer}px);
    margin-block: 10vh;
    margin-inline: auto;
  }
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  position: sticky;
  inset-block-start: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
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

const SmActions = styled.div`
  position: absolute;
  inset-inline: ${({ theme }) => 2 * theme.spacer}px;
  inset-block-end: ${({ theme }) => 3 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`
