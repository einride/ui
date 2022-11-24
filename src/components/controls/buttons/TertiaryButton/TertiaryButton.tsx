import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

interface TertiaryButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the button. */
  children: ReactNode

  /** @deprecated since version 6.16.5. */
  columns?: number | number[]

  /** Adds a loading spinner to the button. */
  isLoading?: boolean

  /** Sets the button to full width. */
  isFullWidth?: boolean

  /** Adds an icon to the right side of the button. */
  rightIcon?: ReactNode
}

export const TertiaryButton = forwardRef<HTMLButtonElement, TertiaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, TertiaryButton.name)
    const hasIcon = !!rightIcon || isLoading

    return (
      <StyledBaseButton
        hasIcon={hasIcon}
        isFullWidth={isFullWidth}
        width={width}
        {...props}
        ref={ref}
      >
        <span data-content>{children}</span>
        {(rightIcon || isLoading) && (
          <BaseButtonIcon data-icon icon={rightIcon} isLoading={isLoading} />
        )}
      </StyledBaseButton>
    )
  },
)

interface StyledBaseButtonProps {
  isFullWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ isFullWidth }) => isFullWidth && "inline-size: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.tertiary};
  color: ${({ theme }) => theme.colors.buttons.text.tertiary};

  &:disabled {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.tertiary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    [data-icon] {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }

  &:not(:disabled) {
    &:hover {
      text-decoration: none;
      background: ${({ theme }) => theme.colors.buttons.background.hover.tertiary};

      [data-content] {
        text-decoration: underline;
      }
    }

    &:active {
      background: ${({ theme }) => theme.colors.buttons.background.active.tertiary};

      [data-content] {
        text-decoration: none;
      }
    }

    &:focus-visible {
      background: ${({ theme }) => theme.colors.buttons.background.focused.tertiary};
    }
  }
`
