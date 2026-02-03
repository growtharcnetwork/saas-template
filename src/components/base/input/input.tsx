import { Input as AriaInput } from "react-aria-components";
import { cx } from "@/utils/cx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, error, size = "md", className, ...props }: InputProps) => {
    const sizeClasses = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3.5 text-sm md:h-11 md:px-4 md:text-base",
        lg: "h-11 px-4 text-md md:h-12 md:px-5 md:text-lg",
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {label}
                </label>
            )}
            <AriaInput
                className={cx(
                    "w-full rounded-lg border border-gray-200 bg-white text-gray-900",
                    "placeholder:text-gray-400",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-[#042282] focus:border-[#042282]",
                    "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
                    error && "border-red-300 focus:outline-red-500 focus:border-red-500",
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

