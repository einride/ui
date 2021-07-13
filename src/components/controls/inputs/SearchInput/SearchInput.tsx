import styled from "@emotion/styled";
import { InputHTMLAttributes, useEffect, useState } from "react";
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
  placeholder: string;
  value: string;
}

export const SearchInput = ({
  placeholder,
  value = "",
  ...props
}: SearchInputProps) => {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (value.length === 0) {
      setIcon("");
      return;
    }
    setIcon("❌");
  }, [value]);

  return (
    <StyledInput
      icon={icon}
      type="search"
      placeholder={placeholder}
      onChange={() => props.onChange}
      value={value}
      {...props}
    />
  );
};
