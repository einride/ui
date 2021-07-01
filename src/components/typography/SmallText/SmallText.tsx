import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.small`
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  padding-top: 3px;
  padding-bottom: 5px;
`;

export interface SmallTextProps {
  children: ReactNode;
}

export const SmallText = ({ children }: SmallTextProps) => {
  return (
    <p>
      <StyledText>{children}</StyledText>
    </p>
  );
};
