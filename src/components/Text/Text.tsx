import { twMerge } from "tailwind-merge";
import { clsx } from "clsx"; // npm install clsx

const BASE = "font-sans transition-colors duration-200 text-gray-900 dark:text-gray-100";

const VARIANTS = {
  text:     "text-base leading-relaxed text-gray-600 dark:text-gray-300",
  title:    "text-3xl font-bold leading-tight",
  subtitle: "text-xl font-semibold leading-snug text-gray-700 dark:text-gray-200",
  caption:  "text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500",
  label:    "text-sm font-semibold text-gray-700 dark:text-gray-300",
};

// twMerge resuelve conflictos + clsx maneja arrays/objetos/undefined
const cx = (variant: keyof typeof VARIANTS, extra?: string) =>
  twMerge(clsx(BASE, VARIANTS[variant], extra));

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Title = ({ as: Tag = "h1", className, children }: Props) => (
  <Tag className={cx("title", className)}>{children}</Tag>
);

const Subtitle = ({ as: Tag = "h2", className, children }: Props) => (
  <Tag className={cx("subtitle", className)}>{children}</Tag>
);

const Caption = ({ as: Tag = "span", className, children }: Props) => (
  <Tag className={cx("caption", className)}>{children}</Tag>
);

const Label = ({ as: Tag = "label", className, children }: Props) => (
  <Tag className={cx("label", className)}>{children}</Tag>
);

const TextBase = ({ as: Tag = "p", className, children }: Props) => (
  <Tag className={cx("text", className)}>{children}</Tag>
);

export const Text = Object.assign(TextBase, { Title, Subtitle, Caption, Label });