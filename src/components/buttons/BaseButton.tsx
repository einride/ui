import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

const SMALL_HEIGHT_PIXELS = 48;
const LARGE_HEIGHT_PIXELS = 56;

interface StyledButtonProps {
  size: "small" | "large";
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: unset;
  border: none;
  width: 240px;
  height: ${({ size }) =>
    size === "small" ? SMALL_HEIGHT_PIXELS : LARGE_HEIGHT_PIXELS}px;
  border-radius: ${LARGE_HEIGHT_PIXELS}px;
  cursor: pointer;
  padding: 0 16px;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;

    svg {
      fill: ${({ theme }) => theme.colors.text.disabled};
    }
  }

  &:focus {
    text-decoration: underline;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }
`;

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "small" | "large";
}

export const BaseButton = (props: BaseButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
