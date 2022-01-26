import styled from "@emotion/styled"
import * as React from "react"
import { InputHTMLAttributes } from "react"
import { Icon } from "../../../content/Icon/Icon"
import { BaseInput } from "../BaseInput/BaseInput"

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange: (input: string) => void
  placeholder: string
  value: string
}

export const SearchInput = ({
  value,
  onInputChange,
  ...props
}: SearchInputProps) => {
  return (
    <Wrapper>
      <StyledInput
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        {...props}
      />
      <LoupeIcon name="loupe" />
      {value && (
        <ClearButton onClick={() => onInputChange("")}>
          <Icon name="xMark" />
        </ClearButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled(BaseInput)`
  padding-right: ${({ theme }) => 5 * theme.spacer}px;
  padding-left: ${({ theme }) => 5 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`

const LoupeIcon = styled(Icon)`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  height: ${({ theme }) => 3 * theme.spacer}px;
  left: ${({ theme }) => 2 * theme.spacer}px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
`

const ClearButton = styled.button`
  position: absolute;
  top: ${({ theme }) => 1.5 * theme.spacer}px;
  height: ${({ theme }) => 3 * theme.spacer}px;
  right: ${({ theme }) => theme.spacer}px;
  padding: 0 ${({ theme }) => theme.spacer}px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
`
