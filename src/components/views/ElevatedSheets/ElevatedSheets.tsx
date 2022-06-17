import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionStyle } from "framer-motion"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import { Theme } from "../../../lib/theme/theme"
import { IconName } from "../../content/Icon/Icon"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"

export interface ElevatedSheetsProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
  navigationAction?: ElevatedSheetsNavigationAction | undefined
  navigationTitle?: string | undefined
  overlayStyles?: MotionStyle
  primaryAction?: ElevatedSheetsAction | undefined
  secondaryAction?: ElevatedSheetsAction | undefined
  /**
   * Default: md
   */
  size?: Size
}

export const ElevatedSheets = forwardRef<HTMLDivElement, ElevatedSheetsProps>(
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
      ...props
    },
    ref,
  ) => {
    const focusTrapRef = useFocusTrap(isOpen)
    useFocusReturn({ opened: isOpen, transitionDuration: 0 })
    const mergedRef = useMergedRef(ref, focusTrapRef)
    useScrollLock(isOpen)

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
              size={size}
              {...props}
              ref={mergedRef}
            >
              <TopNav>
                <Navigation>
                  {navigationAction && (
                    <IconButton
                      onClick={navigationAction.handler}
                      {...navigationAction}
                      aria-label={navigationAction["aria-label"]}
                      icon={navigationAction.icon}
                    />
                  )}
                  {navigationTitle && <Paragraph>{navigationTitle}</Paragraph>}
                </Navigation>
                <MdLgActions>
                  {secondaryAction && (
                    <SecondaryButton {...secondaryAction} onClick={secondaryAction.handler}>
                      {secondaryAction.text}
                    </SecondaryButton>
                  )}
                  {primaryAction && (
                    <PrimaryButton {...primaryAction} onClick={primaryAction.handler}>
                      {primaryAction.text}
                    </PrimaryButton>
                  )}
                </MdLgActions>
              </TopNav>
              <Content hasPrimaryAction={!!primaryAction} hasSecondaryAction={!!secondaryAction}>
                {children}
              </Content>
              <SmActions>
                {primaryAction && (
                  <PrimaryButton isFullWidth {...primaryAction} onClick={primaryAction.handler}>
                    {primaryAction.text}
                  </PrimaryButton>
                )}
                {secondaryAction && (
                  <SecondaryButton
                    isFullWidth
                    {...secondaryAction}
                    onClick={secondaryAction.handler}
                  >
                    {secondaryAction.text}
                  </SecondaryButton>
                )}
              </SmActions>
            </Wrapper>
          </>
        )}
      </AnimatePresence>
    )
  },
)
export interface ElevatedSheetsNavigationAction extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  handler?: () => void
  icon: IconName
}

export interface ElevatedSheetsAction extends ButtonHTMLAttributes<HTMLButtonElement> {
  handler?: () => void
  text: ReactNode
}

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
  border-top-left-radius: ${({ theme }) => 2 * theme.spacer}px;
  border-top-right-radius: ${({ theme }) => 2 * theme.spacer}px;
  z-index: 2;
  overflow-y: auto;

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

const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  z-index: 1; // to cover content with relative positioned elements
`

const Navigation = styled.div`
  display: flex;
  gap: ${({ theme }) => 2 * theme.spacer}px;
  align-items: center;
`

const MdLgActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => 2 * theme.spacer}px;

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    display: none;
  }
`

const Content = styled.div<{
  hasPrimaryAction: boolean
  hasSecondaryAction: boolean
}>`
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 2 * theme.spacer}px;

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    padding-bottom: ${({ hasPrimaryAction, hasSecondaryAction, theme }) =>
      getPaddingBottom(hasPrimaryAction, hasSecondaryAction, theme)}px;
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

  @media ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
