import { Button } from "@/components/base/buttons/button";
import type { FC } from "react";

interface SocialButtonProps {
    icon: FC<{ className?: string }>;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const SocialButton = ({ icon: Icon, children, onClick, className }: SocialButtonProps) => {
    return (
        <Button
            color="secondary"
            size="md"
            iconLeading={Icon}
            onClick={onClick}
            className={className}
        >
            {children}
        </Button>
    );
};

