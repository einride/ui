import styled from "@emotion/styled"
import { ChangeEvent, forwardRef, HTMLAttributes, ReactNode } from "react"
import { SearchInput } from "../../inputs/SearchInput/SearchInput"

export interface SearchSelectProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const SearchSelect = forwardRef<HTMLDivElement, SearchSelectProps>(
  ({ children, ...props }, ref): JSX.Element => {
    return (
      <div {...props} ref={ref}>
        <SearchInput aria-label="yo" placeholder="yo" />
        <OptionsWrapper>{children}</OptionsWrapper>
      </div>
    )
  },
)

const OptionsWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => 2 * theme.spacer}px;
  margin-top: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
`
