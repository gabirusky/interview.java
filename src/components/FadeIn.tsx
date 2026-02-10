import { ReactNode, ElementType } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: ElementType;
}

export function FadeIn({ children, className, delay = 0, as: Component = "div" }: FadeInProps) {
    const ref = useScrollAnimation<HTMLElement>(delay);

    return (
        <Component ref={ref} className={cn("opacity-0", className)}>
            {children}
        </Component>
    );
}
