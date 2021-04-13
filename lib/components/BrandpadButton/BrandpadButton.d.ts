import { ReactNode } from "react";
export interface BrandpadButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}
export declare const BrandpadButton: {
    ({ children, ...props }: BrandpadButtonProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
    };
};
