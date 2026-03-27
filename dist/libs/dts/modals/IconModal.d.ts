interface IconModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
    selectedValue?: string;
}
export declare const IconModal: ({ open, onClose, onSelect, selectedValue, }: IconModalProps) => import("react/jsx-runtime").JSX.Element;
export {};
