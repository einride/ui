import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { Avatar } from "../Avatar/Avatar"

export interface UserAccessPointProps
  extends HTMLAttributes<HTMLButtonElement> {
  avatarImageSrc: string
  /** Default: "md" */
  size?: Size
  variant?: Variant
}

export const UserAccessPoint = forwardRef<
  HTMLButtonElement,
  UserAccessPointProps
>(({ avatarImageSrc, size = "md", variant = "plain", ...props }, ref) => {
  return (
    <Button size={size} variant={variant} {...props} ref={ref}>
      <StyledIconButton
        aria-label="Search"
        as="div"
        icon="loupe"
        size={size}
        variant={variant}
      />
      <StyledAvatar
        alt="User profile picture"
        src={avatarImageSrc}
        size={getAvatarSize(size, variant)}
      />
    </Button>
  )
})

type Size = "md" | "sm"
type Variant = "plain" | "raised"

const Button = styled.button<{ size: Size; variant: Variant }>`
  ${({ theme, variant }) =>
    variant === "raised" && `background: ${theme.colors.background.primary}`};
  border-radius: 24px;
  ${({ variant }) => variant === "raised" && "padding: 4px"};
  align-items: center;
  gap: ${({ size }) => getButtonGap(size)};
  display: flex;
`

const StyledIconButton = styled(IconButton)<{ size: Size; variant: Variant }>`
  height: ${({ size, theme, variant }) => getButtonSize(size, theme, variant)};
  width: ${({ size, theme, variant }) => getButtonSize(size, theme, variant)};
  min-width: ${({ size, theme, variant }) =>
    getButtonSize(size, theme, variant)};
  padding: 0;
`

const StyledAvatar = styled(Avatar)`
  -webkit-user-drag: none;
`

const getButtonGap = (size: Size) => {
  switch (size) {
    case "md":
      return "8px"
    case "sm":
      return "4px"
    default:
      return "8px"
  }
}

const getAvatarSize = (size: Size, variant: Variant) => {
  if (variant === "raised") return "md"
  switch (size) {
    case "md":
      return "lg"
    case "sm":
      return "md"
    default:
      return "lg"
  }
}

const getButtonSize = (size: Size, theme: Theme, variant: Variant) => {
  if (variant === "raised") return `${5 * theme.spacer}px`
  switch (size) {
    case "md":
      return `${6 * theme.spacer}px`
    case "sm":
      return `${5 * theme.spacer}px`
    default:
      return `${6 * theme.spacer}px`
  }
}
