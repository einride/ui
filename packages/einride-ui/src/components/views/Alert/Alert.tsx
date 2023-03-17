import styled from "@emotion/styled"
import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { CSSProperties, ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"
import { zIndex } from "../../../lib/zIndex"
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../controls/buttons/PrimaryButton/PrimaryButton"
import {
  SecondaryButton,
  SecondaryButtonProps,
} from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Box } from "../../layout/Box/Box"
import { VerticalSpacing } from "../../layout/VerticalSpacing/VerticalSpacing"
import { Text } from "../../typography/Text/Text"

interface AlertProps
  extends Omit<
      ComponentPropsWithoutRef<"div">,
      "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style" | "title"
    >,
    AlertStyles {
  /** Custom content of the alert. Prefer using `title` and `description`. */
  children?: ReactNode

  /** A callback that closes the alert. Needed for closing on escape and overlay click. */
  closeHandler: () => void

  /** Description of the alert. Rendered in `<Text>`. */
  description?: ReactNode

  /** Controls whether the alert is open or closed. */
  isOpen: boolean

  /** Props passed to the overlay element. */
  overlayProps?: Omit<
    ComponentPropsWithoutRef<"div">,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
  > & {
    style: Omit<CSSProperties, "rotate" | "scale" | "perspective">
  }

  /** Primary action of the alert. Usually a confirmation of an action. */
  primaryAction?: (PrimaryButtonProps & { "data-testid"?: string }) | undefined

  /** Secondary action of the alert. Usually a cancel button that closes the alert. */
  secondaryAction?: (SecondaryButtonProps & { "data-testid"?: string }) | undefined

  /** Title of the alert. Rendered in `<Text>`. */
  title?: ReactNode
}

interface AlertStyles {
  style?: Omit<CSSProperties, "rotate" | "scale" | "perspective">
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
      primaryAction,
      secondaryAction,
      title,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <AnimatePresence>
        <AlertDialog.Root open={isOpen}>
          <AlertDialog.Portal>
            <AlertDialogOverlay
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              {...overlayProps}
            />
            <AlertDialogContent
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onEscapeKeyDown={closeHandler}
              {...props}
              ref={forwardedRef}
            >
              {title && (
                <AlertDialog.Title asChild>
                  <Text>{title}</Text>
                </AlertDialog.Title>
              )}
              {description && (
                <AlertDialog.Description asChild>
                  <Text color="secondary">{description}</Text>
                </AlertDialog.Description>
              )}
              {children && <Box>{children}</Box>}
              <VerticalSpacing size="xl" />
              <VerticalSpacing size="md" />
              <Box display="flex" flexDirection="column" gap="sm">
                {primaryAction && (
                  <AlertDialog.Action asChild>
                    <PrimaryButton {...primaryAction} isFullWidth onClick={primaryAction.onClick}>
                      {primaryAction.children}
                    </PrimaryButton>
                  </AlertDialog.Action>
                )}
                {secondaryAction && (
                  <AlertDialog.Cancel asChild>
                    <SecondaryButton
                      {...secondaryAction}
                      isFullWidth
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.children}
                    </SecondaryButton>
                  </AlertDialog.Cancel>
                )}
              </Box>
            </AlertDialogContent>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </AnimatePresence>
    )
  },
)

const AlertDialogOverlay = styled(motion(AlertDialog.Overlay))`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: ${zIndex.alert - 10}; // below but close to alert
`

const AlertDialogContent = styled(motion(AlertDialog.Content))`
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  flex-basis: ${({ theme }) => 44 * theme.spacingBase}rem;
  max-inline-size: ${({ theme }) => 44 * theme.spacingBase}rem;
  padding: ${({ theme }) => 2 * theme.spacingBase}rem;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  z-index: ${zIndex.alert};
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    inset-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
    inset-block-end: ${({ theme }) => 2 * theme.spacingBase}rem;
    transform: none;
  }
`
