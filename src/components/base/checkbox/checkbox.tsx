import { Checkbox as AriaCheckbox } from "react-aria-components";
import { cx } from "@/utils/cx";
import type { ReactNode } from "react";

interface CheckboxProps {
    children?: ReactNode;
    isSelected?: boolean;
    onChange?: (isSelected: boolean) => void;
    className?: string;
}

export const Checkbox = ({ children, isSelected, onChange, className }: CheckboxProps) => {
    return (
        <AriaCheckbox
            isSelected={isSelected}
            onChange={onChange}
            className={cx(
                "group flex items-center gap-2 text-sm text-gray-700",
                "cursor-pointer",
                className
            )}
        >
            <div className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white transition-colors group-hover:border-[#042282] group-selected:border-[#042282] group-selected:bg-[#042282]">
                <svg
                    className="h-3 w-3 text-white opacity-0 transition-opacity group-selected:opacity-100"
                    fill="none"
                    viewBox="0 0 12 12"
                >
                    <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            {children && <span>{children}</span>}
        </AriaCheckbox>
    );
};

