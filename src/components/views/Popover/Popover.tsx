import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionStyle } from "framer-motion"
import { forwardRef, ReactNode, useEffect } from "react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"

export interface PopoverProps extends Omit<HTMLMotionProps<"div">, "title"> {
  children: ReactNode
  closeHandler: () => void
  isOpen: boolean
  overlayStyles?: MotionStyle
  primaryAction?: PopoverAction
  secondaryAction?: PopoverAction
  title?: ReactNode
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      closeHandler,
      isOpen,
      overlayStyles = {},
      primaryAction,
      secondaryAction,
      title,
      ...props
    },
    ref,
  ) => {
    const focusTrapRef = useFocusTrap(isOpen)
    useFocusReturn({ opened: isOpen, transitionDuration: 0 })
    const mergedRef = useMergedRef(ref, focusTrapRef)
    useScrollLock(isOpen)

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
              <MediumLargeNav>
                {title ? <Paragraph>{title}</Paragraph> : <div />}
                <Actions>
                  {secondaryAction && (
                    <SecondaryButton onClick={secondaryAction.handler}>
                      {secondaryAction.text}
                    </SecondaryButton>
                  )}
                  {primaryAction && (
                    <PrimaryButton data-autofocus onClick={primaryAction.handler}>
                      {primaryAction.text}
                    </PrimaryButton>
                  )}
                </Actions>
              </MediumLargeNav>
              <Content>{children}</Content>
              <SmallNav>
                {primaryAction && (
                  <PrimaryButton data-autofocus isFullWidth onClick={primaryAction.handler}>
                    {primaryAction.text}
                  </PrimaryButton>
                )}
                {secondaryAction && (
                  <SecondaryButton isFullWidth onClick={secondaryAction.handler}>
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

export interface PopoverAction {
  handler?: () => void
  text: ReactNode
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: 1;
  display: flex;
  justify-content: center;
`

const Wrapper = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => 10 * theme.spacer}px;
  right: ${({ theme }) => 2 * theme.spacer}px;
  bottom: ${({ theme }) => 2 * theme.spacer}px;
  left: ${({ theme }) => 2 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  z-index: 2;

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: max(50vw, ${({ theme }) => theme.breakpoints.md - 2 * theme.spacer}px);
    margin: 10vh auto;
  }
`

const MediumLargeNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: 0;
`

const Actions = styled.div`
  display: none;

  @media ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => 2 * theme.spacer}px;
  }
`

const Content = styled.div`
  padding: ${({ theme }) => 2 * theme.spacer}px;
`

const SmallNav = styled.nav`
  position: absolute;
  right: ${({ theme }) => 4 * theme.spacer}px;
  left: ${({ theme }) => 4 * theme.spacer}px;
  bottom: ${({ theme }) => 5 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacer}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
