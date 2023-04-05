import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { Avatar } from "../Avatar/Avatar"

export interface UserAccessPointBaseProps extends Omit<ComponentPropsWithoutRef<"button">, "name"> {
  /** Effective element used. */
  as?: ElementType

  /** Status of the user access point. Default is `default`. */
  status?: Status
}

interface UserAccessPointWithImageProps {
  /** Source of the image. */
  avatarImageSrc: string
}

interface UserAccessPointWithInitialsProps {
  /** Name of the user, used to compute initials. */
  name: string
}

export type UserAccessPointProps = UserAccessPointBaseProps &
  (UserAccessPointWithImageProps | UserAccessPointWithInitialsProps)

export const UserAccessPoint = forwardRef<HTMLButtonElement, UserAccessPointProps>(
  ({ status = "default", ...props }, ref) => {
    if (status === "no-user") {
      return (
        <Button status={status} {...props} ref={ref}>
          <StyledAvatar
            alt="Einride logo"
            size="sm"
            src="https://avatars.githubusercontent.com/u/31446515?s=200&v=4"
          />
        </Button>
      )
    }

    return (
      <Button status={status} {...props} ref={ref}>
        {"avatarImageSrc" in props ? (
          <StyledAvatar alt="User profile picture" size="sm" src={props.avatarImageSrc} />
        ) : (
          <StyledAvatar
            aria-label={props.name}
            background="primaryInverted"
            color="primaryInverted"
            name={props.name}
            size="sm"
          />
        )}
        <Right>{status === "notification" ? <Notification /> : <Dots aria-label="Search" />}</Right>
      </Button>
    )
  },
)

type Status = "default" | "notification" | "no-user"

const Button = styled.button<{ status: Status }>`
  position: relative;
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  align-items: center;
  display: flex;
  padding: ${({ theme }) => 0.5 * theme.spacingBase}rem;
`

const StyledAvatar = styled(Avatar)`
  -webkit-user-drag: none;
  border: none;
`

const Right = styled.div`
  inline-size: ${({ theme }) => 5 * theme.spacingBase}rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  justify-content: center;
  align-items: center;
`

const Notification = styled.div`
  background: ${({ theme }) => theme.colors.content.negative};
  inline-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.full};
`

const Dots = (): JSX.Element => {
  return (
    <>
      <Dot />
      <Dot />
      <Dot />
    </>
  )
}

const Dot = styled.div`
  inline-size: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.full};
  background: ${({ theme }) => theme.colors.content.primary};
`
