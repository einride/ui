import { ReactNode } from "react";
export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    formId?: string;
    hasArrow?: boolean;
    isFullWidth?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}
export declare const Button: {
    ({ children, hasArrow, ...props }: ButtonProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
        formId: undefined;
        hasArrow: boolean;
        isFullWidth: boolean;
        onClick: undefined;
        type: string;
    };
};
export interface BrandpadButtonProps {
    children: ReactNode;
    onClick: () => void;
}
export declare const BrandpadButton: ({ children, ...props }: BrandpadButtonProps) => JSX.Element;
