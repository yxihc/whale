import glob from 'fast-glob';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { excludeFiles } from '../utils/pkg';
import { PKG_NAME, moduleOutputs, target } from '../build.config';
import { generateExternal, writeBundles } from '../utils/rollup';
import { buildOutput, pkgRoot, wlRoot } from '../utils/paths';
import type { OutputOptions, Plugin } from 'rollup';
import type { TaskFunction } from 'gulp';
//打包插件

const plugins: Plugin[] = [
  vue(),
  json(),
  vueJsx(),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts'],
  }),
  commonjs(),
  esbuild({
    sourceMap: true,
    target,
    loaders: {
      '.vue': 'ts',
    },
  }),
] as Plugin[];
export const buildModulesComponents = async () => {
  // 找到package下所有的代码文件
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );
  const bundle = await rollup({
    //需要打包的文件
    input,
    //打包插件
    plugins,
    external: await generateExternal({ full: false }),
    // 是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），除非您发现由tree-shaking算法引起的bug，在这种情况下，请使用“treeshake：false”，一旦您提交了问题！
    treeshake: { moduleSideEffects: false },
  });
  await writeBundles(bundle, moduleOutputs);
};

export const buildModulesStyles = async () => {
  const input = excludeFiles(
    await glob('**/style/(index|css).{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );
  const bundle = await rollup({
    input,
    plugins,
    treeshake: false,
  });
  const outputs: OutputOptions[] = [
    {
      format: 'esm',
      dir: `${buildOutput}/${PKG_NAME}/es/components`,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: wlRoot,
      sourcemap: true,
      entryFileNames: '[name].mjs',
    },
    {
      format: 'cjs',
      dir: `${buildOutput}/${PKG_NAME}/lib/components`,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: wlRoot,
      sourcemap: true,
      entryFileNames: '[name].js',
    },
  ];
  await writeBundles(bundle, outputs);
};

export const buildModules: TaskFunction = async () => {
  await buildModulesComponents();
  await buildModulesStyles();
};
