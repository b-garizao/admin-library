import React from "react";
/** Tipo de componente de icono compatible con className (para el front). */
export type IconComponentType = React.ComponentType<{
    className?: string;
}>;
export declare function getIcon(name: string | undefined): IconComponentType;
/**
 * Recorre recursivamente un objeto y reemplaza cualquier campo cuyo nombre esté
 * en ICON_NAME_KEYS y cuyo valor sea un string (nombre Lineicons) por getIcon().
 * No toca strings que parecen URLs (p. ej. icon que era imagen y ya es URL).
 */
export declare function getIconsMap<T>(data: T): T;
