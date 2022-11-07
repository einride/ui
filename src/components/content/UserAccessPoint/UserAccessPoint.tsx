import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef } from "react"
import { Avatar } from "../Avatar/Avatar"

export interface UserAccessPointBaseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "name"> {
  /** Effective element used. */
  as?: ElementType

  /** Status of the user access point. Default is `default`.  */
  status?: Status
}

interface UserAccessPointWithImageProps {
  /** Source of the image. */
  avatarImageSrc: string | undefined
}

interface UserAccessPointWithInitialsProps {
  /** Name of the user, used to compute initials. */
  name: string | undefined
}

type UserAccessPointProps = UserAccessPointBaseProps &
  (UserAccessPointWithImageProps | UserAccessPointWithInitialsProps)

export const UserAccessPoint = forwardRef<HTMLButtonElement, UserAccessPointProps>(
  ({ status = "default", ...props }, ref) => {
    if (status === "no-user") {
      return (
        <Button status={status} {...props} ref={ref}>
          <StyledAvatar
            alt="User profile picture"
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
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  align-items: center;
  display: flex;
  padding: ${({ theme }) => 0.5 * theme.spacer}px;
`

const StyledAvatar = styled(Avatar)`
  -webkit-user-drag: none;
  border: none;
`

const Right = styled.div`
  inline-size: ${({ theme }) => 5 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 0.5 * theme.spacer}px;
  justify-content: center;
  align-items: center;
`

const Notification = styled.div`
  background: ${({ theme }) => theme.colors.content.negative};
  inline-size: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 2 * theme.spacer}px;
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
  inline-size: ${({ theme }) => 0.5 * theme.spacer}px;
  block-size: ${({ theme }) => 0.5 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.full};
  background: ${({ theme }) => theme.colors.content.primary};
`
