import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { MenuItem } from "../../../menus/MenuItem/MenuItem"

export interface SearchSelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isSelected: boolean
  isActive: boolean
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

const Wrapper = styled(MenuItem)<{ isSelected: boolean }>`
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.background.tertiary : theme.colors.background.secondaryElevated};
`
