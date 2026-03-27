import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps as ButtonProps$1, InputProps, SelectProps, GetProp, UploadProps } from 'antd';
import * as react from 'react';
import react__default, { ReactNode } from 'react';
import * as antd_es_input_OTP from 'antd/es/input/OTP';
import * as antd_es_input_TextArea from 'antd/es/input/TextArea';
import * as rc_input from 'rc-input';
import * as antd_es_input from 'antd/es/input';
import { TextAreaProps } from 'antd/es/input';
import * as rc_select_lib_OptGroup from 'rc-select/lib/OptGroup';
import * as rc_select_lib_Option from 'rc-select/lib/Option';

interface ButtonProps extends ButtonProps$1 {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
}

declare const Button: ({ className, children, variant, startIcon, endIcon, size, ...rest }: ButtonProps) => react_jsx_runtime.JSX.Element;

interface IconProps {
    name: string;
    className?: string;
}
declare const Icon: ({ name, className }: IconProps) => react_jsx_runtime.JSX.Element;

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: react__default.ReactNode;
    className?: string;
}
declare const Dropdown: ({ isOpen, onClose, children, className, }: DropdownProps) => react_jsx_runtime.JSX.Element | null;

interface DropdownItemProps {
    tag?: "a" | "button";
    to?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    className?: string;
    children: react__default.ReactNode;
}
declare const DropdownItem: ({ tag, to, onClick, onItemClick, baseClassName, className, children, }: DropdownItemProps) => react_jsx_runtime.JSX.Element;

interface Props {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
declare const Text: (({ as: Tag, className, children }: Props) => react_jsx_runtime.JSX.Element) & {
    Title: ({ as: Tag, className, children }: Props) => react_jsx_runtime.JSX.Element;
    Subtitle: ({ as: Tag, className, children }: Props) => react_jsx_runtime.JSX.Element;
    Caption: ({ as: Tag, className, children }: Props) => react_jsx_runtime.JSX.Element;
    Label: ({ as: Tag, className, children }: Props) => react_jsx_runtime.JSX.Element;
};

declare const Input: {
    ({ children, ...rest }: InputProps): react_jsx_runtime.JSX.Element;
    Password: react.ForwardRefExoticComponent<antd_es_input.PasswordProps & react.RefAttributes<rc_input.InputRef>>;
    Search: react.ForwardRefExoticComponent<antd_es_input.SearchProps & react.RefAttributes<rc_input.InputRef>>;
    TextArea: react.ForwardRefExoticComponent<antd_es_input.TextAreaProps & react.RefAttributes<antd_es_input_TextArea.TextAreaRef>>;
    OTP: react.ForwardRefExoticComponent<antd_es_input_OTP.OTPProps & react.RefAttributes<antd_es_input_OTP.OTPRef>>;
};

declare const Select: {
    ({ className, ...rest }: SelectProps): react_jsx_runtime.JSX.Element;
    Option: rc_select_lib_Option.OptionFC;
    OptGroup: rc_select_lib_OptGroup.OptionGroupFC;
};

declare const TextArea: ({ ...rest }: TextAreaProps) => react_jsx_runtime.JSX.Element;

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
declare const UrlField: ({ routes, isExternal, value, onChange, placeholder, }: UrlFieldProps) => react_jsx_runtime.JSX.Element;

interface IconSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}
declare const IconSelect: react__default.FC<IconSelectProps>;

/** Tipo de componente de icono compatible con className (para el front). */
type IconComponentType = react__default.ComponentType<{
    className?: string;
}>;
declare function getIcon(name: string | undefined): IconComponentType;
/**
 * Recorre recursivamente un objeto y reemplaza cualquier campo cuyo nombre esté
 * en ICON_NAME_KEYS y cuyo valor sea un string (nombre Lineicons) por getIcon().
 * No toca strings que parecen URLs (p. ej. icon que era imagen y ya es URL).
 */
declare function getIconsMap<T>(data: T): T;

declare function sanityImageUrl(builder: any, source: {
    asset?: {
        _ref?: string;
    };
} | undefined): string | null;
interface envProp {
    proj: any;
    ds: any;
}
declare function processImages<T>(builder: any, env: envProp, data: T): T;

/**
 * Hash a plain text password using bcrypt.
 * Recommended rounds: 10
 */
declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compare a plain text password with a hashed version.
 */
declare const comparePassword: (password: string, hashed: string) => Promise<boolean>;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
declare const getBase64: (file: FileType) => Promise<string>;
declare const PreviewImage: ({ file, open, onClose }: any) => react_jsx_runtime.JSX.Element;

interface IconModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
    selectedValue?: string;
}
declare const IconModal: ({ open, onClose, onSelect, selectedValue, }: IconModalProps) => react_jsx_runtime.JSX.Element;

export { Button, Dropdown, DropdownItem, Icon, IconModal, IconSelect, Input, PreviewImage, Select, Text, TextArea, UrlField, comparePassword, getBase64, getIcon, getIconsMap, hashPassword, processImages, sanityImageUrl };
export type { ButtonProps, IconComponentType };
