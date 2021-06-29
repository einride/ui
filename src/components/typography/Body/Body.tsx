import styled from "@emotion/styled";
import { ReactNode } from "react";

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  padding-top: 5px;
  padding-bottom: 3px;
`;

export interface BodyProps {
  children: ReactNode;
}

export const Body = ({ children }: BodyProps) => {
  return <Text>{children}</Text>;
};
