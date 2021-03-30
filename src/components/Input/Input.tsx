import styled from "@emotion/styled";
import { ChangeEvent, forwardRef } from "react";

interface LabelProps {
  isFullWidth?: boolean;
  isInvalid?: boolean;
}

const Label = styled.label<LabelProps>`
  position: relative;
  display: ${({ isFullWidth }) => (isFullWidth ? "block" : "inline-block")};

  &::before {
    content: attr(data-label);
    position: absolute;
    top: var(--spacing);
    left: var(--spacing);
    color: ${({ isInvalid }) =>
      isInvalid
        ? "var(--input-label-error-color)"
        : "var(--input-label-color)"};
  }
`;

interface StyledInputProps {
  isDark?: boolean;
  isFullWidth?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  background: ${({ isDark }) =>
    isDark ? "var(--input-dark-background)" : "var(--input-background)"};
  color: ${({ isDark }) =>
    isDark ? "var(--input-dark-color)" : "var(--input-color)"};
  border: none;
  border-radius: var(--input-border-radius);
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  padding: 30px 10px 10px;
  border: var(--input-border);

  &::placeholder {
    color: ${({ isDark }) =>
      isDark ? "var(--input-dark-color)" : "var(--input-color)"};
  }

  &:focus::placeholder {
    color: transparent;
  }

  &:active,
  &:hover {
    background: ${({ isDark }) =>
      isDark
        ? "var(--input-dark-hover-background)"
        : "var(--input-hover-background)"};
  }
`;

export interface InputProps {
  isDark?: boolean;
  isFullWidth?: boolean;
  isInvalid?: boolean;
  label: string;
  min?: number;
  onBlur?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "email" | "password";
  value: string | number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isFullWidth, isInvalid, label, onBlur, onFocus, ...props }, ref) => {
    return (
      <Label
        data-label={label}
        isFullWidth={isFullWidth}
        isInvalid={isInvalid}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        <StyledInput isFullWidth={isFullWidth} {...props} ref={ref} />
      </Label>
    );
  }
);

Input.defaultProps = {
  isDark: false,
  isInvalid: false,
  isFullWidth: false,
  min: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  placeholder: undefined,
  required: false,
  type: "text",
};
