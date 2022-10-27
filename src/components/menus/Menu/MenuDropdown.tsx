import styled from "@emotion/styled"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"
import { useMenu } from "./MenuProvider"

type MenuDropdownProps = HTMLMotionProps<"div">

export const MenuDropdown = forwardRef<HTMLDivElement, MenuDropdownProps>(
  ({ children, ...props }, ref): JSX.Element | null => {
    const { isOpen, height, position } = useMenu()

    return (
      <AnimatePresence>
        {isOpen && (
          <Wrapper
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            data-position={position}
            menuTriggerHeight={height}
            {...props}
            ref={ref}
          >
            {children}
          </Wrapper>
        )}
      </AnimatePresence>
    )
  },
)

interface WrapperProps {
  menuTriggerHeight: number
}

const Wrapper = styled(motion.div)<WrapperProps>`
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media ${({ theme }) => theme.mediaQueries.belowMd} {
    position: fixed;
    inset-block-end: ${({ theme }) => 2 * theme.spacer}px;
    inset-inline: ${({ theme }) => 2 * theme.spacer}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    width: ${({ theme }) => 28 * theme.spacingBase}rem;

    &[data-position="top-start"] {
      inset-block-end: ${({ menuTriggerHeight, theme }) => menuTriggerHeight + theme.spacer}px;
      inset-inline-start: 0;
    }

    &[data-position="top-end"] {
      inset-block-end: ${({ menuTriggerHeight, theme }) => menuTriggerHeight + theme.spacer}px;
      inset-inline-end: 0;
    }

    &[data-position="bottom-start"] {
      inset-block-start: ${({ menuTriggerHeight, theme }) => menuTriggerHeight + theme.spacer}px;
      inset-inline-start: 0;
    }

    &[data-position="bottom-end"] {
      inset-block-start: ${({ menuTriggerHeight, theme }) => menuTriggerHeight + theme.spacer}px;
      inset-inline-end: 0;
    }
  }
`
