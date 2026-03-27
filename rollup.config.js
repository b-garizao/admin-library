import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDeps from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const onwarn = (warning, warn) => {
  if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
  warn(warning);
};

// ─── postcss va solo en la entrada principal ──────────────────────────────────
const postcssPlugin = postcss({
  extract: "styles.css", // genera dist/styles.css
  minimize: true,
  sourceMap: true,
  config: { path: "./postcss.config.js" },
});

const buildEntry = (input, outDir) => ({
  input,
  onwarn,
  output: [
    { file: `dist/${outDir}/index.js`, format: "cjs", sourcemap: true },
    { file: `dist/${outDir}/index.esm.js`, format: "esm", sourcemap: true },
  ],
  plugins: [
    peerDeps(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: ["react", "react-dom", "antd", "react-router"],
});

const buildTypes = (input, outFile) => ({
  input,
  output: [{ file: outFile, format: "esm" }],
  plugins: [dts()],
  external: [/\.css$/],
});

export default [
  // ─── Entrada principal — aquí va postcss ────────────────────────────────────
  {
    input: "src/index.ts",
    onwarn,
    output: [
      { file: "dist/index.js", format: "cjs", sourcemap: true },
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },
    ],
    plugins: [
      peerDeps(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcssPlugin, // ← solo aquí para que el CSS se extraiga una sola vez
    ],
    external: ["react", "react-dom", "antd", "react-router"],
  },

  buildEntry("src/components/index.ts", "components"),
  buildEntry("src/libs/index.ts", "libs"),
  buildEntry("src/modals/index.ts", "modals"),

  buildTypes("dist/dts/index.d.ts", "dist/index.d.ts"),
  buildTypes("dist/dts/components/index.d.ts", "dist/components/index.d.ts"),
  buildTypes("dist/dts/libs/index.d.ts", "dist/libs/index.d.ts"),
  buildTypes("dist/dts/modals/index.d.ts", "dist/modals/index.d.ts"),
];
