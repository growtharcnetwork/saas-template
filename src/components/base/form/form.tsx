import { Form as AriaForm } from "react-aria-components";
import { cx } from "@/utils/cx";
import type { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    children: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

export const Form = ({ children, onSubmit, className, ...props }: FormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <AriaForm onSubmit={handleSubmit} className={cx("w-full", className)} {...props}>
            {children}
        </AriaForm>
    );
};

