import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { Loader, LoaderProps } from "../Loader/Loader"

export interface PageLoaderProps extends ComponentPropsWithoutRef<"div"> {
  /** Props passed to loader element. */
  loaderProps?: LoaderProps

  /** Content shown to the right of the loader. Default is `<>Loading</>`. */
  text?: ReactNode
}

/** Full screen loading indicator. */
export const PageLoader = forwardRef<HTMLDivElement, PageLoaderProps>(({ loaderProps, text = <>
      Loading
    </>, ...props }, forwardedRef): JSX.Element => {
  return (
    <Wrapper {...props} ref={forwardedRef}>
      <Loader {...loaderProps} /> {text}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: fixed;
  inset-block: 0;
  inset-inline-start: ${({ theme }) => 4 * theme.spacer}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacingBase}rem;
`
