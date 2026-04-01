import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDeps from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const onwarn = (warning, warn) => {
  if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
  if (warning.message?.includes("Circular")) return;
  console.log('Rollup Warning:', warning.code, warning.message);
  warn(warning);
};

const postcssPlugin = postcss({
  extract: "styles.css",
  minimize: true,
  sourceMap: true,
  config: { path: "./postcss.config.js" },
});

export default [
  {
    input: "src/index.ts",
    onwarn,
    output: [
      { file: "dist/index.js", format: "cjs", sourcemap: true, inlineDynamicImports: true },
      { file: "dist/index.esm.js", format: "esm", sourcemap: true, inlineDynamicImports: true },
    ],
    plugins: [
      peerDeps(),
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      postcssPlugin,
    ],
    external: [
      "react", 
      "react-dom", 
      "antd", 
      "react-router", 
      "react-router-dom", 
      "@sanity/client",
      "bcrypt-ts",
    ],
  },
];
