interface Props {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare const Text: (({ as: Tag, className, children }: Props) => import("react/jsx-runtime").JSX.Element) & {
    Title: ({ as: Tag, className, children }: Props) => import("react/jsx-runtime").JSX.Element;
    Subtitle: ({ as: Tag, className, children }: Props) => import("react/jsx-runtime").JSX.Element;
    Caption: ({ as: Tag, className, children }: Props) => import("react/jsx-runtime").JSX.Element;
    Label: ({ as: Tag, className, children }: Props) => import("react/jsx-runtime").JSX.Element;
};
export {};
