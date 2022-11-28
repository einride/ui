import styled from "@emotion/styled"
import { useFocusReturn, useFocusTrap, useMergedRef, useScrollLock } from "@mantine/hooks"
import { AnimatePresence, HTMLMotionProps, motion, MotionProps, MotionStyle } from "framer-motion"
import { forwardRef, ReactNode, useCallback, useEffect } from "react"
import { zIndex } from "../../../lib/zIndex"
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../controls/buttons/PrimaryButton/PrimaryButton"
import {
  SecondaryButton,
  SecondaryButtonProps,
} from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { VerticalSpacing } from "../../layout/VerticalSpacing/VerticalSpacing"
import { Paragraph } from "../../typography/Paragraph/Paragraph"

interface AlertProps extends Omit<HTMLMotionProps<"div">, "title"> {
  /** Custom content of the alert. Prefer using `title` and `description`. */
  children?: ReactNode

  /** A callback that closes the alert. Needed for closing on escape and overlay click. */
  closeHandler: () => void

  /** Description of the alert. Rendered in a `<Paragraph>`. */
  description?: ReactNode

  /** Controls whether the alert is open or closed. */
  isOpen: boolean

  /** Props passed to the overlay element. */
  overlayProps?: MotionProps

  /** @deprecated since 6.56.1. Use `overlayProps` instead. */
  overlayStyles?: MotionStyle

  /** Primary action of the alert. Usually a confirmation of an action. */
  primaryAction?: (PrimaryButtonProps & { "data-testid"?: string }) | undefined

  /** Secondary action of the alert. Usually a cancel button that closes the alert. */
  secondaryAction?: (SecondaryButtonProps & { "data-testid"?: string }) | undefined

  /** Title of the alert. Rendered in a `<Paragraph>`. */
  title?: ReactNode
}

/** An alert commonly used when there's a need to interrupt the user with a mandatory confirmation or action. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      closeHandler,
      description,
      isOpen,
      overlayProps,
      overlayStyles = {},
      primaryAction,
      secondaryAction,
      title,
      ...props
    },
    ref,
  ) => {
    const focusTrapRef = useFocusTrap(isOpen)
    useFocusReturn({ opened: isOpen })
    const mergedRef = useMergedRef(ref, focusTrapRef)
    useScrollLock(isOpen)

    const closeOnEscapePress = useCallback(
      (event: KeyboardEvent): void => {
        if (event.code === "Escape") {
          closeHandler()
        }
      },
      [closeHandler],
    )

    useEffect(() => {
      window.addEventListener("keydown", closeOnEscapePress)
      return () => window.removeEventListener("keydown", closeOnEscapePress)
    }, [closeOnEscapePress])

    return (
      <AnimatePresence>
        {isOpen && (
          <Overlay
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeHandler}
            style={overlayStyles}
            {...overlayProps}
          >
            <Wrapper
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              {...props}
              ref={mergedRef}
              onClick={(e) => e.stopPropagation()}
            >
              {title && <Paragraph>{title}</Paragraph>}
              {description && <Paragraph color="secondary">{description}</Paragraph>}
              <Content>{children}</Content>
              <VerticalSpacing size="xl" />
              <VerticalSpacing size="md" />
              <Actions>
                {primaryAction && (
                  <PrimaryButton
                    {...primaryAction}
                    data-autofocus
                    isFullWidth
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.children}
                  </PrimaryButton>
                )}
                {secondaryAction && (
                  <SecondaryButton
                    {...secondaryAction}
                    isFullWidth
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.children}
                  </SecondaryButton>
                )}
              </Actions>
            </Wrapper>
          </Overlay>
        )}
      </AnimatePresence>
    )
  },
)

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: ${zIndex.overlay};
  display: flex;
  justify-content: center;
  align-items: flex-end;

  // to prevent alert from touching screen edges on small screens
  padding: ${({ theme }) => 2 * theme.spacer}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    align-items: center;
  }
`

const Wrapper = styled(motion.div)`
  max-inline-size: ${({ theme }) => 44 * theme.spacer}px;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  z-index: ${zIndex.alert};
  display: flex;
  flex-direction: column;
`

const Content = styled.div``

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacer}px;
`
