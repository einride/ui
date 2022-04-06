import styled from "@emotion/styled"
import {
  useFocusReturn,
  useFocusTrap,
  useMergedRef,
  useScrollLock,
} from "@mantine/hooks"
import { AnimatePresence, motion } from "framer-motion"
import { forwardRef, ReactNode, useEffect } from "react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"

export interface PopoverProps {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
  primaryAction?: {
    handler?: () => void
    text: ReactNode
  }
  secondaryAction?: {
    handler?: () => void
    text: ReactNode
  }
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, closeHandler, isOpen, primaryAction, secondaryAction }, ref) => {
    const focusTrapRef = useFocusTrap(isOpen)
    useFocusReturn({ opened: isOpen, transitionDuration: 0 })
    const mergedRef = useMergedRef(ref, focusTrapRef)
    useScrollLock(isOpen)

    const closeOnEscapePress = (event: KeyboardEvent) => {
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
            />
            <Wrapper
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background.focus};
`

const Wrapper = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => 10 * theme.spacer}px;
  right: ${({ theme }) => 2 * theme.spacer}px;
  bottom: ${({ theme }) => 2 * theme.spacer}px;
  left: ${({ theme }) => 2 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-radius: ${({ theme }) => 2 * theme.spacer}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    top: 10vh;
    right: calc(25% - 5px);
    bottom: 10vh;
    left: calc(25% - 5px);
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    top: 10vh;
    right: calc(25% - 5px);
    bottom: 10vh;
    left: calc(25% - 5px);
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
