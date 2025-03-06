import glob from 'fast-glob';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { target } from '@whale/build/src/build-info.ts';
import { excludeFiles } from '../utils/pkg';
import { moduleOutputs } from '../build.config.ts';
import { writeBundles } from '../utils/rollup.ts';
import { pkgRoot } from './../utils/paths';
import type { Plugin } from 'rollup';

export const buildModules = async () => {
  // 找到package下所有的代码文件
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );

  const bundle = await rollup({
    //需要打包的文件
    input,
    //打包插件
    plugins: [
      vue() as Plugin,
      vueJsx() as Plugin,
      commonjs() as Plugin,
      esbuild({
        sourceMap: true,
        // 为了应对 umd 直接加载到浏览器里，构建目标需要设定得兼容性更强
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    // 是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），除非您发现由tree-shaking算法引起的bug，在这种情况下，请使用“treeshake：false”，一旦您提交了问题！
    treeshake: true,
  });
  await writeBundles(bundle, moduleOutputs);
  // await Promise.all(moduleOutputs.map((option) => bundle.write(option)));
};
