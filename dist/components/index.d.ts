import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonProps as ButtonProps$1, InputProps, SelectProps } from 'antd';
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

export { Button, Dropdown, DropdownItem, Icon, IconSelect, Input, Select, Text, TextArea, UrlField };
export type { ButtonProps };
