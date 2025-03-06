import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import vue from '@vitejs/plugin-vue';
import esbuild from 'rollup-plugin-esbuild';

// export const excludeFiles = (files: string[]) => {
//   const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
//   return files.filter(
//     (path) => !excludes.some((exclude) => path.includes(exclude))
//   );
// };
//
// const input = excludeFiles(
//   await glob('**/*.{js,ts,vue}', {
//     // cwd: pkgRoot,
//     cwd: process.cwd(),
//     absolute: true,
//     onlyFiles: true,
//   })
// );

export default defineConfig({
  // input, // 输入文件路径
  input: ['index.ts'],
  output: [
    // String 生成包的格式。 下列之一:
    // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    // esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    {
      dir: 'dist/lib', // 输出文件路径及名称
      format: 'cjs',
      entryFileNames: `[name].js`,
      sourcemap: true, // 是否生成sourcemap
    },
    {
      // file: 'dist/bundle.esm.js',
      dir: 'dist/en',
      format: 'esm',
      entryFileNames: `[name].mjs`,
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    // resolve({
    //   preferBuiltins: true, // 优先使用内置模块
    //   rootDir: process.cwd(), // 设置解析的根目录为当前工作目录
    // }),
    commonjs(),
    esbuild({
      minify: true,
      sourceMap: true,
    }),
    // vue(),
  ],
});
