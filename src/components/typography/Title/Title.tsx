import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 40px;
  font-weight: bold;
  line-height: 48px;
  padding-top: 1px;
  padding-bottom: 7px;
`;

export interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <StyledText>{children}</StyledText>;
};
