import styled from "@emotion/styled";
import { ReactNode } from "react";

const Text = styled.small`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  padding-top: 3px;
  padding-bottom: 5px;
`;
export interface SmallProps {
  children: ReactNode;
}

export const Small = ({ children }: SmallProps) => {
  return <Text>{children}</Text>;
};
