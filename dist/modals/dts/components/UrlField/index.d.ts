interface UrlFieldProps {
    routes: {
        label: string;
        value: string;
    }[];
    isExternal: boolean;
    value?: string;
    onChange?: (v: string) => void;
    placeholder?: string;
}
/**
 * Smart URL input:
 * - When isExternal=true  → free-text input for any URL
 * - When isExternal=false → select from known internal pages
 */
export declare const UrlField: ({ routes, isExternal, value, onChange, placeholder, }: UrlFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
