import React from 'react';

/** Tipo de componente de icono compatible con className (para el front). */
type IconComponentType = React.ComponentType<{
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

export { comparePassword, getIcon, getIconsMap, hashPassword, processImages, sanityImageUrl };
export type { IconComponentType };
