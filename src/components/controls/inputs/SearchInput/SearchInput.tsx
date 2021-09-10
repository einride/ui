import styled from "@emotion/styled"
import * as React from "react"
import { InputHTMLAttributes } from "react"
import xMark from "../../../../assets/icons/xMark.svg"
import { BaseInput } from "../BaseInput"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled(BaseInput)`
  padding-right: 29px; /* right-padding (16px) + width of xMark (13px) */
`

const ClearButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  height: 24px;
  border: none;
  background-color: unset;
  background-image: url(${xMark});
  background-repeat: no-repeat;
  background-position: center;
`

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
      {value && <ClearButton onClick={() => onInputChange("")} />}
    </Wrapper>
  )
}
