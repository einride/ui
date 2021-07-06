import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton } from "../BaseButton";

const StyledBaseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.primary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.primary};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.positive};
  text-decoration: none !important;
`;

export interface WithIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: string;
  size?: "small" | "large";
}

export const WithIconButton = ({
  children,
  icon = "→",
  size = "large",
  ...props
}: WithIconButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      <ContentWrapper>
        {children}
        <IconWrapper>{icon}</IconWrapper>
      </ContentWrapper>
    </StyledBaseButton>
  );
};
