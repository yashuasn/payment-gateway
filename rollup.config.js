import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");
import image from 'rollup-plugin-images';
import json from '@rollup/plugin-json';

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      "url": false,
      "assert": false,
      browser: true,
      "tty": false,
      "util": false,
      "os": false,
      "zlib": false,
      "path": false,
      "crypto": false,
      // modules: [resolve(process.cwd(), 'src'), 'node_modules'],
      extensions: ['*', 'ts', 'tsx', '.js', '.jsx', '.json'],
      symlinks: false,
      cacheWithContext: false
    }),
    commonjs(),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: ['.css']
    }),
    image({
      output: `assets/images`, // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      limit: 8192,  // default 8192(8k)
      exclude: 'node_modules/**'
    })
  ],

};