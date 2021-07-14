import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes } from "react";
import xMark from "../../../../assets/icons/xMark.svg";
import { BaseInput } from "../BaseInput";

const StyledForm = styled.form`
  position: relative;
  width: max-content;
`;

const StyledInput = styled(BaseInput)`
  padding-right: 29px; // right-padding (16px) + width of xMark (13px)
`;

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
`;

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

export const SearchInput = ({ value, ...props }: SearchInputProps) => {
  return (
    <StyledForm>
      <StyledInput value={value} {...props} />
      {value && <ClearButton type="reset" />}
    </StyledForm>
  );
};
