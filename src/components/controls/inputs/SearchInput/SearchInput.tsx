import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { BaseInput } from "../BaseInput";

const StyledInput = styled(BaseInput)`
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    cursor: pointer;
    height: 13px;
    width: 13px;
    z-index: 1;
    margin: 0;
  }
`;

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

export const SearchInput = ({ value, ...props }: SearchInputProps) => {
  const icon = value.length ? "❌" : "";

  return <StyledInput icon={icon} type="search" value={value} {...props} />;
};
