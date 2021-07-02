import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ReactComponent as ArrowRightwards } from "../../../../assets/icons/arrowRightwards.svg";
import { SecondaryButton } from "../SecondaryButton";

const getWidth = (size?: "small" | "large") => {
  switch (size) {
    case "small":
      return 48;
    default:
      return 56;
  }
};

const StyledBaseButton = styled(SecondaryButton)<IconButtonProps>`
  min-width: ${({ size }) => getWidth(size)}px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledArrowRightwards = styled(ArrowRightwards)`
  fill: ${({ theme }) => theme.colors.content.primary};
`;

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  size?: "small" | "large";
}

export const IconButton = ({
  icon = <StyledArrowRightwards />,
  size = "large",
  ...props
}: IconButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      {icon}
    </StyledBaseButton>
  );
};
