import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"

const Wrapper = styled.button<{ selected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.content.primary : theme.colors.content.secondary};
  padding-top: ${({ theme }) => theme.spacer + 1}px;
  padding-bottom: ${({ theme }) => 2 * theme.spacer - 1}px;
  border-bottom: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.border.selected : theme.colors.border.primary};
  margin-bottom: ${({ theme }) => 3 * theme.spacer}px;
`

export interface SegmentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick: () => void
  selected?: boolean
}

export const Segment = ({ children, selected, ...props }: SegmentProps) => {
  return (
    <Wrapper selected={selected} {...props}>
      {children}
    </Wrapper>
  )
}
