import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface SearchSelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isSelected: boolean
}

export const SearchSelectOption = forwardRef<HTMLDivElement, SearchSelectOptionProps>(
  ({ children, isSelected, ...props }, ref): JSX.Element => {
    return (
      <Wrapper isSelected={isSelected} tabIndex={0} {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding: ${({ theme }) => theme.spacer}px;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.background.tertiary : theme.colors.background.secondaryElevated};
`
