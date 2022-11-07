import styled from "@emotion/styled"
import { HTMLAttributes, ReactNode } from "react"
import { Loader, LoaderProps } from "../Loader/Loader"

interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
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
  inset-block: 0;
  inset-inline-start: ${({ theme }) => 4 * theme.spacer}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacer}px;
`
