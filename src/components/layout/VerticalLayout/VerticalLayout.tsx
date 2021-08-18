import styled from "@emotion/styled";
import { ReactNode } from "react";

const getHeight = (size?: Size) => {
  switch (size) {
    case "small":
      return 16;
    case "medium":
      return 24;
    case "large":
      return 72;
    case "extraLarge":
      return 120;
    default:
      return 16;
  }
};

const StyledDiv = styled.div<VerticalLayoutProps>`
  display: grid;
  grid-row-gap: ${({ size }) => getHeight(size)}px;
`;

type Size = "small" | "medium" | "large" | "extraLarge";

export interface VerticalLayoutProps {
  children: ReactNode;
  classname?: string;
  size?: Size;
}

export const VerticalLayout = ({
  size = "small",
  ...props
}: VerticalLayoutProps) => {
  return <StyledDiv size={size} {...props} />;
};
