import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { Loader } from "../../../feedback/Loader/Loader"

export interface BaseButtonIconProps extends ComponentPropsWithoutRef<"div"> {
  /** Determines whether to show loading spinner or not. */
  isLoading?: boolean

  /** Icon to show in the button. */
  icon: ReactNode
}

export const BaseButtonIcon = ({ icon, isLoading, ...props }: BaseButtonIconProps): JSX.Element => {
  return <Wrapper {...props}>{isLoading ? <Loader /> : <IconWrapper>{icon}</IconWrapper>}</Wrapper>
}

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.buttons.icon.primary};
  margin-inline-start: ${({ theme }) => 2 * theme.spacingBase}rem;
`

const IconWrapper = styled.div`
  inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 3 * theme.spacingBase}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
