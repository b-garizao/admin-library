import type React from "react";
interface DropdownItemProps {
    tag?: "a" | "button";
    to?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    className?: string;
    children: React.ReactNode;
}
export declare const DropdownItem: ({ tag, to, onClick, onItemClick, baseClassName, className, children, }: DropdownItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
