import styled from "@emotion/styled"
import { ElementType, forwardRef, ImgHTMLAttributes } from "react"

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  as?: ElementType
  src: string
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  return <Image {...props} ref={ref} />
})

const Image = styled.img`
  width: ${({ theme }) => 5 * theme.spacer}px;
  height: ${({ theme }) => 5 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`
