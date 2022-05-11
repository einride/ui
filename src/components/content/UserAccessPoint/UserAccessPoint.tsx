import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { Avatar } from "../Avatar/Avatar"

export interface UserAccessPointProps
  extends HTMLAttributes<HTMLButtonElement> {
  avatarImageSrc: string
  status?: Status
}

export const UserAccessPoint = forwardRef<
  HTMLButtonElement,
  UserAccessPointProps
>(({ avatarImageSrc, status = "default", ...props }, ref) => {
  return (
    <Button status={status} {...props} ref={ref}>
      <StyledAvatar alt="User profile picture" src={avatarImageSrc} />
      <Right>
        {status === "notification" ? (
          <Notification />
        ) : (
          <Dots aria-label="Search" />
        )}
      </Right>
    </Button>
  )
})

type Status = "default" | "notification" | "no-user"

const Button = styled.button<{ status: Status }>`
  position: relative;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
  align-items: center;
  display: flex;
  padding: ${({ theme }) => 0.5 * theme.spacer}px;
`

const StyledAvatar = styled(Avatar)`
  -webkit-user-drag: none;
`

const Right = styled.div`
  width: ${({ theme }) => 5 * theme.spacer}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => 0.5 * theme.spacer}px;
  justify-content: center;
  align-items: center;
`

const Notification = styled.div`
  background: ${({ theme }) => theme.colors.content.negative};
  width: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: 10px;
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
  width: ${({ theme }) => 0.5 * theme.spacer}px;
  height: ${({ theme }) => 0.5 * theme.spacer}px;
  border-radius: ${({ theme }) => 0.5 * theme.spacer}px;
  background: ${({ theme }) => theme.colors.content.primary};
`
