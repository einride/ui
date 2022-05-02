import styled from "@emotion/styled"
import {
  useFocusReturn,
  useFocusTrap,
  useMergedRef,
  useScrollLock,
} from "@mantine/hooks"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionStyle,
} from "framer-motion"
import { forwardRef, ReactNode } from "react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"

export interface ElevatedSheetsProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
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
              <MediumLargeNav>
                <Actions>
                  {secondaryAction && (
                    <SecondaryButton onClick={secondaryAction.handler}>
                      {secondaryAction.text}
                    </SecondaryButton>
                  )}
                  {primaryAction && (
                    <PrimaryButton onClick={primaryAction.handler}>
                      {primaryAction.text}
                    </PrimaryButton>
                  )}
                </Actions>
              </MediumLargeNav>
              <Content>{children}</Content>
              <SmallNav>
                {primaryAction && (
                  <PrimaryButton isFullWidth onClick={primaryAction.handler}>
                    {primaryAction.text}
                  </PrimaryButton>
                )}
                {secondaryAction && (
                  <SecondaryButton
                    isFullWidth
                    onClick={secondaryAction.handler}
                  >
                    {secondaryAction.text}
                  </SecondaryButton>
                )}
              </SmallNav>
            </Wrapper>
          </>
        )}
      </AnimatePresence>
    )
  },
)

export interface ElevatedSheetsAction {
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

const MediumLargeNav = styled.nav`
  display: none;

  @media ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    padding: ${({ theme }) => 2 * theme.spacer}px;
    padding-bottom: 0;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`

const Content = styled.div`
  padding: ${({ theme }) => 2 * theme.spacer}px;
`

const SmallNav = styled.nav`
  position: absolute;
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
