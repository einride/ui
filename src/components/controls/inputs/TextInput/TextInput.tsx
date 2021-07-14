import styled from "@emotion/styled";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { Theme } from "../../../../theme";
import { BaseInput } from "../BaseInput";

const getBackgroundColor = (theme: Theme, status?: Status) => {
  switch (status) {
    case "success":
      return theme.colors.background.positive;
    case "fail":
      return theme.colors.background.negative;
    default:
      return theme.colors.background.secondary;
  }
};

const getColor = (theme: Theme, status?: Status) => {
  switch (status) {
    case "success":
      return theme.colors.content.positive;
    case "fail":
      return theme.colors.content.negative;
    default:
      return theme.colors.content.secondary;
  }
};

const getStatusIcon = (status?: Status) => {
  switch (status) {
    case "success":
      return "✓";
    case "fail":
      return "⚠︎";
    default:
      return "";
  }
};

const StyledLabel = styled.label<{ status?: Status }>`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin: 5px 0 3px;
  color: ${({ theme, status }) => getColor(theme, status)};

  &:focus-within {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`;

const StyledBaseInput = styled(BaseInput)<{ status?: Status }>`
  background-color: ${({ theme, status }) => getBackgroundColor(theme, status)};
`;

const StyledMessage = styled.div`
  color: ${({ theme }) => theme.colors.content.secondary};
  margin: 3px 0 5px;
  font-size: 14px;
`;

type Status = "success" | "fail";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  status?: Status;
  statusMessage?: ReactNode;
  value: string;
}

export const TextInput = ({
  label,
  required,
  status,
  statusMessage,
  ...props
}: TextInputProps) => {
  return (
    <StyledLabel status={status}>
      {label} {required && " (required)"}
      <StyledBaseInput
        icon={getStatusIcon(status)}
        required={required}
        status={status}
        {...props}
      />
      {status && <StyledMessage>{statusMessage}</StyledMessage>}
    </StyledLabel>
  );
};
