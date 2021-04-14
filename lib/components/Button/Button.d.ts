import { ReactNode } from "react";
export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}
export declare const Button: {
    ({ children, ...props }: ButtonProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
    };
};
