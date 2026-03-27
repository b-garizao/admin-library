export function sanityImageUrl(
  builder: any,
  source: { asset?: { _ref?: string } } | undefined,
): string | null {
  if (!source?.asset?._ref) return null;
  return builder.image(source).url();
}

/** Comprueba si un valor es una referencia de imagen de Sanity. */
function isSanityImageRef(
  value: unknown,
): value is { asset?: { _ref?: string } } {
  return (
    value !== null &&
    typeof value === "object" &&
    "asset" in value &&
    typeof (value as { asset?: unknown }).asset === "object" &&
    typeof (value as { asset?: { _ref?: unknown } }).asset?._ref === "string"
  );
}

/** Comprueba si un valor es una referencia de archivo de Sanity.
 *
 * Sanity "file" fields generally come back with an `asset` reference
 * (e.g. `{ _type: 'file', asset: { _ref: 'file‑xyz' }}`) rather than the
 * transient `_upload` object that exists during a new upload.  The helper
 * used to examine the object only needs to know that it is a file-like
 * document, so we keep the check simple.
 */
function isSanityFileRef(value: unknown): value is {
  _type: "file";
  asset?: { _ref?: string };
  _upload?: { file?: { type: string } };
} {
  return (
    value !== null &&
    typeof value === "object" &&
    "_type" in value &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value as any)._type === "file"
  );
}

interface envProp {
  proj: any;
  ds: any;
}
function processSanityFile(
  builder: any,
  env: envProp,
  data: any,
): string | null {
  if (!data) return null;

  // many file references come through as `{ _type: 'file', asset: { _ref: 'file-<id>-<ext>' } }`.
  // build the CDN url directly rather than asking the image helper, which only
  // understands images and will throw for "file" refs.
  const ref: string | undefined = data.asset?._ref;
  if (ref) {
    const m = /^file-([^-]+)-(.+)$/.exec(ref);
    if (m) {
      const [, id, ext] = m;
      const proj = env.proj;
      const ds = env.ds;
      if (proj && ds) {
        return `https://cdn.sanity.io/files/${proj}/${ds}/${id}.${ext}`;
      }
    }
  }

  // fall back to the image builder in case the reference happens to be an
  // image (or the regexp above didn't match).  this covers any accidental
  // `image` types that were passed in.
  try {
    return builder.image(data).url();
  } catch {
    return null;
  }
}

export function processImages<T>(builder: any, env: envProp, data: T): T {
  if (data === null || data === undefined) {
    return data;
  }
  if (isSanityFileRef(data)) {
    // si es un fichero/archivo devolvemos directamente la URL o `null`.
    return processSanityFile(builder, env, data) as unknown as T;
  }
  if (isSanityImageRef(data)) {
    return sanityImageUrl(builder, data) as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => processImages(builder, env, item)) as T;
  }
  if (typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      out[key] = processImages(builder, env, value);
    }
    return out as T;
  }
  return data;
}
