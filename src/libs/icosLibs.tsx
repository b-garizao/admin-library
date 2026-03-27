import React from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import * as FreeIcons from "@lineiconshq/free-icons";
import type { IconData } from "@lineiconshq/free-icons";

const isIconData = (v: unknown): v is IconData =>
  typeof v === "object" &&
  v !== null &&
  "svg" in v &&
  "viewBox" in v &&
  "name" in v;

const ICON_MAP: Record<string, IconData> = Object.fromEntries(
  Object.entries(FreeIcons).filter(
    (entry): entry is [string, IconData] =>
      isIconData(entry[1]) && entry[0] !== "IconName",
  ),
);

const FALLBACK_ICON_NAME = "GraduationCap1Outlined";
const FALLBACK_ICON: IconData | undefined =
  ICON_MAP[FALLBACK_ICON_NAME] ?? Object.values(ICON_MAP)[0];

/** Tipo de componente de icono compatible con className (para el front). */
export type IconComponentType = React.ComponentType<{ className?: string }>;

/**
 * Devuelve un componente de icono Lineicons por nombre (nombre de export guardado en Sanity).
 */

function kebabToPascal(name: string): string {
  return (
    name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("") + "Outlined"
  );
}

export function getIcon(name: string | undefined): IconComponentType {
  if (!name || typeof name !== "string") return () => null;
  const key = name.trim();
  // Intenta primero el nombre tal cual, luego convierte de kebab a PascalCase
  const resolvedKey = key in ICON_MAP ? key : kebabToPascal(key);
  const iconData: IconData | undefined =
    resolvedKey in ICON_MAP ? ICON_MAP[resolvedKey] : FALLBACK_ICON;
  if (!iconData) return () => null;
  const Icon = (props: { className?: string }) => (
    <Lineicons icon={iconData} size={24} className={props.className} />
  );
  return Icon;
}

/** Claves que se consideran nombre de icono (string) y se reemplazan por getIcon(). */
const ICON_NAME_KEYS = ["icon", "iconName"] as const;

/** Comprueba si el string parece URL (no es un nombre de icono). */
function looksLikeUrl(s: string): boolean {
  const t = s.trim();
  return t.startsWith("http") || t.startsWith("/") || t.includes(".");
}

/**
 * Recorre recursivamente un objeto y reemplaza cualquier campo cuyo nombre esté
 * en ICON_NAME_KEYS y cuyo valor sea un string (nombre Lineicons) por getIcon().
 * No toca strings que parecen URLs (p. ej. icon que era imagen y ya es URL).
 */
export function getIconsMap<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => getIconsMap(item)) as T;
  }
  if (typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (
        ICON_NAME_KEYS.includes(key as (typeof ICON_NAME_KEYS)[number]) &&
        typeof value === "string" &&
        value.trim() !== "" &&
        !looksLikeUrl(value)
      ) {
        out[key] = getIcon(value);
      } else {
        out[key] = getIconsMap(value);
      }
    }
    return out as T;
  }
  return data;
}
