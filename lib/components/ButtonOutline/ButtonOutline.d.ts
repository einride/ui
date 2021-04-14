import { ReactNode } from "react";
export interface ButtonOutlineProps {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}
export declare const ButtonOutline: {
    ({ children, ...props }: ButtonOutlineProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
    };
};
