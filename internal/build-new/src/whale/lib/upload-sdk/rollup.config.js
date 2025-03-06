'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rollup = require('rollup');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('rollup-plugin-typescript2');
var esbuild = require('rollup-plugin-esbuild');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var commonjs__default = /*#__PURE__*/_interopDefaultLegacy(commonjs);
var typescript__default = /*#__PURE__*/_interopDefaultLegacy(typescript);
var esbuild__default = /*#__PURE__*/_interopDefaultLegacy(esbuild);

var rollup_config = rollup.defineConfig({
  input: ["index.ts"],
  output: [
    {
      dir: "dist/lib",
      format: "cjs",
      entryFileNames: `[name].js`,
      sourcemap: true
    },
    {
      dir: "dist/en",
      format: "esm",
      entryFileNames: `[name].mjs`,
      sourcemap: true
    }
  ],
  plugins: [
    typescript__default["default"](),
    commonjs__default["default"](),
    esbuild__default["default"]({
      minify: true,
      sourceMap: true
    })
  ]
});

exports["default"] = rollup_config;
//# sourceMappingURL=rollup.config.js.map
