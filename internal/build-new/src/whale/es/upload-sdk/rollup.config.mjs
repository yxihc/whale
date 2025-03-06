import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import esbuild from 'rollup-plugin-esbuild';

var rollup_config = defineConfig({
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
    typescript(),
    commonjs(),
    esbuild({
      minify: true,
      sourceMap: true
    })
  ]
});

export { rollup_config as default };
//# sourceMappingURL=rollup.config.mjs.map
