import styled from "@emotion/styled"
import { HTMLAttributes, ReactNode } from "react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Loader } from "../Loader/Loader"

export interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  text?: ReactNode
}

export const PageLoader = ({
  text = <>Loading</>,
  ...props
}: PageLoaderProps): JSX.Element => {
  return (
    <Wrapper {...props}>
      <Loader /> {text && <Paragraph>{text}</Paragraph>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${({ theme }) => 4 * theme.spacer}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacer}px;
`
