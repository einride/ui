import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface SearchSelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SearchSelectOption = forwardRef<HTMLDivElement, SearchSelectOptionProps>(
  ({ children, ...props }, ref): JSX.Element => {
    return (
      <Wrapper tabIndex={0} {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  border-radius: ${({ theme }) => 2 * theme.spacer}px;
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  padding-block: ${({ theme }) => theme.spacer}px;
`
