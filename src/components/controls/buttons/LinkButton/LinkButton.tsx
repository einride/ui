import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { ContentColor } from "../../../../lib/theme/types"

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ children, color = "primary", ...props }, ref) => {
    return (
      <StyledButton color={color} {...props} ref={ref}>
        {children}
      </StyledButton>
    )
  },
)

const StyledButton = styled.button<{ color: ContentColor }>`
  border-radius: ${({ theme }) => theme.borderRadii.sm};

  &:hover:not([aria-disabled="true"]) {
    text-decoration: underline;
  }

  &:active:not([aria-disabled="true"]) {
    text-decoration: none;
  }

  &:focus-visible:not([aria-disabled="true"]) {
    outline: none;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
    text-decoration: underline;
  }
`
