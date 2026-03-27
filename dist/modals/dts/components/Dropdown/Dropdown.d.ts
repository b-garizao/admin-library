import type React from "react";
interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}
export declare const Dropdown: ({ isOpen, onClose, children, className, }: DropdownProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
