import styled from "@emotion/styled"
import { HTMLAttributes, ReactNode } from "react"
import { Loader, LoaderProps } from "../Loader/Loader"

export interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Props passed to loader element. */
  loaderProps?: LoaderProps

  /** Content shown to the right of the loader. Default is `<>Loading</>`. */
  text?: ReactNode
}

export const PageLoader = ({
  loaderProps,
  text = <>Loading</>,
  ...props
}: PageLoaderProps): JSX.Element => {
  return (
    <Wrapper {...props}>
      <Loader {...loaderProps} /> {text}
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
