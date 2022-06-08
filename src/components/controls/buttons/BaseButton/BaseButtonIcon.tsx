import styled from "@emotion/styled"
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { Loader } from "../../../feedback/Loader/Loader"

export interface BaseButtonIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading?: boolean
  icon: ReactNode
}

export const BaseButtonIcon = ({ icon, isLoading, ...props }: BaseButtonIconProps): JSX.Element => {
  return <Wrapper {...props}>{isLoading ? <Loader /> : <IconWrapper>{icon}</IconWrapper>}</Wrapper>
}

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.buttons.icon.primary};
  margin-left: ${({ theme }) => 2 * theme.spacer}px;
`

const IconWrapper = styled.div`
  width: ${({ theme }) => 3 * theme.spacer}px;
  height: ${({ theme }) => 3 * theme.spacer}px;
`
