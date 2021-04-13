import { ChangeEvent } from "react";
export interface InputProps {
    isDark?: boolean;
    isFullWidth?: boolean;
    isInvalid?: boolean;
    label: string;
    min?: number;
    onBlur?: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "number" | "email" | "password";
    value: string | number;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
