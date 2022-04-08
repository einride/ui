import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { useTheme } from "../../../hooks/useTheme"
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
      <Dots aria-label="Search" />
      <StyledAvatar alt="User profile picture" src={avatarImageSrc} />
      {status === "notification" && <Notification />}
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
  gap: 1px;
  padding-right: ${({ theme }) => 0.5 * theme.spacer}px;
`

const Dots = (): JSX.Element => {
  const theme = useTheme()
  const fill = theme.colors.content.primary
  return (
    <svg
      width="43"
      height="48"
      viewBox="0 0 43 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="22" y="14" width="4" height="4" rx="2" fill={fill} />
      <rect x="22" y="22" width="4" height="4" rx="2" fill={fill} />
      <rect x="22" y="30" width="4" height="4" rx="2" fill={fill} />
    </svg>
  )
}

const StyledAvatar = styled(Avatar)`
  -webkit-user-drag: none;
`

const Notification = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  background: ${({ theme }) => theme.colors.content.negative};
  width: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 2 * theme.spacer}px;
  border-radius: 10px;
`
