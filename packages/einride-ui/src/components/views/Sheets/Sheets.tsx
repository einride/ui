import { useMediaQuery } from "@einride/hooks"
import styled from "@emotion/styled"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { CSSProperties, ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"
import { useTheme, zIndex } from "@einride/core"
import { IconButton, IconButtonProps } from "../../controls/buttons/IconButton/IconButton"
import {
  PrimaryButton,
  PrimaryButtonProps,
} from "../../controls/buttons/PrimaryButton/PrimaryButton"
import {
  SecondaryButton,
  SecondaryButtonProps,
} from "../../controls/buttons/SecondaryButton/SecondaryButton"

export interface SheetsProps
  extends Omit<
      ComponentPropsWithoutRef<"div">,
      "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style" | "title"
    >,
    DialogStyles {
  /** Content of the sheets. */
  children: ReactNode

  /** Event handler that closes the sheets. Used to make close on Escape or overlay click. */
  closeHandler: () => void

  /**
   * Controls whether sheets should close when clicking outside or not. Default is `true`.
   * @deprecated since v7.10.0. Use `modal` instead.
   */
  closeOnClickOutside?: boolean

  /** Controls whether the sheets is open or not. */
  isOpen: boolean

  /** The modality of the sheets. When `true`, interaction with outside elements will be disabled, only dialog content will be visible to screen readers and an overlay will appear. Default is `true`. */
  modal?: boolean

  /** Navigation action. */
  navigationAction?: (IconButtonProps & { "data-testid"?: string }) | undefined

  /** Navigation title. */
  navigationTitle?: ReactNode

  /** Props passed to the overlay element. */
  overlayProps?: Omit<
    ComponentPropsWithoutRef<"div">,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
  > & {
    style: Omit<CSSProperties, "rotate" | "scale" | "perspective">
  }

  /** Primary action of the sheets. */
  primaryAction?: (PrimaryButtonProps & { "data-testid"?: string }) | undefined

  /** Secondary action of the sheets. */
  secondaryAction?: (SecondaryButtonProps & { "data-testid"?: string }) | undefined

  /** Size of the sheets. Default is `md`. */
  size?: Size

  /**
   * Whether or not to show an overlay. Default is `true`.
   * @deprecated since v7.10.0. Use `modal` instead.
   */
  withOverlay?: boolean
}

interface DialogStyles {
  style?: Omit<CSSProperties, "rotate" | "scale" | "perspective">
}

export const Sheets = forwardRef<HTMLDivElement, SheetsProps>(
  (
    {
      children,
      closeHandler,
      closeOnClickOutside = true,
      isOpen,
      modal = true,
      navigationAction,
      navigationTitle,
      overlayProps,
      primaryAction,
      secondaryAction,
      size = "md",
      withOverlay = true,
      ...props
    },
    forwardedRef,
  ) => {
    const theme = useTheme()
    const isAboveSm = useMediaQuery(theme.mediaQueries.md)
    return (
      <AnimatePresence>
        <Dialog.Root modal={modal} open={isOpen}>
          <Dialog.Portal>
            {withOverlay && (
              <DialogOverlay
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                {...overlayProps}
              />
            )}
            <DialogContent
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              size={size}
              onBlur={(e) => e.stopPropagation()} // to prevent weird focus bugs with interactive components such as <SearchSelect>, where focus is blurred and then immediately reapplied when clicking on an option in modal mode
              onEscapeKeyDown={closeHandler}
              onPointerDownOutside={() => {
                if (closeOnClickOutside && modal) {
                  closeHandler()
                }
              }}
              {...props}
              ref={forwardedRef}
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
              <Content
                data-primary-action={Boolean(primaryAction)}
                data-secondary-action={Boolean(secondaryAction)}
              >
                {children}
              </Content>
              {!isAboveSm && (
                <SmActions>
                  {primaryAction && <PrimaryButton isFullWidth {...primaryAction} />}
                  {secondaryAction && <SecondaryButton isFullWidth {...secondaryAction} />}
                </SmActions>
              )}
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </AnimatePresence>
    )
  },
)

type Size = "sm" | "md"

const DialogOverlay = styled(motion(Dialog.Overlay))`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background.focus};
  z-index: ${zIndex.sheets - 10}; // below but close to sheets
`

const DialogContent = styled(motion(Dialog.Content))<{ size: Size }>`
  position: fixed;
  inset-block-start: ${({ theme }) => 8 * theme.spacingBase}rem;
  inset-block-end: 0;
  inset-inline: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  border-start-start-radius: ${({ theme }) => theme.borderRadii.lg};
  border-start-end-radius: ${({ theme }) => theme.borderRadii.lg};
  display: flex;
  flex-direction: column;
  // prevent navigation bar from overflowing sheets
  overflow: hidden;
  z-index: ${zIndex.sheets};

  @media ${({ theme }) => theme.mediaQueries.md} {
    inset-block: ${({ theme }) => 2 * theme.spacingBase}rem;
    inset-inline-end: ${({ theme }) => 2 * theme.spacingBase}rem;
    inset-inline-start: unset;
    border-end-start-radius: ${({ theme }) => theme.borderRadii.lg};
    border-end-end-radius: ${({ theme }) => theme.borderRadii.lg};
    display: initial;
    inline-size: ${({ size, theme }) =>
      size === "sm"
        ? `calc((300% / 8) - 3 * ${theme.spacingBase}rem)` // to fit grid
        : `calc((100% / 2) - 3 * ${theme.spacingBase}rem)`}; // to fit grid
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    inset-block-start: ${({ theme }) => 3 * theme.spacer}px;
    inset-inline-end: ${({ theme }) => 3 * theme.spacer}px;
    inset-inline-start: unset;
    inset-block-end: ${({ theme }) => 3 * theme.spacer}px;
    inline-size: ${({ size, theme }) =>
      size === "sm"
        ? `calc((100% / 3) - 4 * ${theme.spacingBase}rem)` // to fit grid
        : `calc((100% / 2) - 4.5 * ${theme.spacingBase}rem)`}; // to fit grid
  }
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => 2 * theme.spacingBase}rem;
  position: sticky;
  inset-block-start: 0;
  background: ${({ theme }) => theme.colors.background.primaryElevated};
  z-index: 1; // to cover content with relative positioned elements
`

const NavigationAction = styled.div`
  display: flex;
  gap: ${({ theme }) => 2 * theme.spacingBase}rem;
  align-items: center;
`

const MdLgActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => 2 * theme.spacingBase}rem;
`

const Content = styled.div`
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  // fix height to enable setting overflow-y
  block-size: calc(100% - ${({ theme }) => 10 * theme.spacingBase}rem);
  // when there's more content than room in the sheets, it should scroll and not overlow
  overflow-y: auto;

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-block-end: ${({ theme }) => 2 * theme.spacingBase}rem;
  }
`

const SmActions = styled.nav`
  margin-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  margin-block-start: ${({ theme }) => theme.spacingBase}rem;
  margin-block-end: ${({ theme }) => 2 * theme.spacingBase}rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 2 * theme.spacingBase}rem;
`
