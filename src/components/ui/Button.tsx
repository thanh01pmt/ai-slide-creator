import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: "bg-cta text-white shadow-md hover:opacity-90",
            secondary: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
            ghost: "bg-transparent text-text hover:bg-black/5",
            destructive: "bg-red-500 text-white hover:bg-red-600",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
            icon: "p-2",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
