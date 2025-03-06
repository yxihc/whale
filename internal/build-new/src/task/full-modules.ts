import path from 'path';
import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash-es';
import { rollup } from 'rollup';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { target } from '@whale/build/src/build-info.ts';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import commonjs from '@rollup/plugin-commonjs';
import { wlRoot } from '@whale/build-utils';
import { generateExternal } from '@whale/build/src';
import { PKG_CAMELCASE_NAME } from '@whale/build-constants';
import nodeResolve from '@rollup/plugin-node-resolve';
import { version } from '../../../../packages/whale/version';
import { PKG_BRAND_NAME, PKG_CAMELCASE_LOCAL_NAME } from '../build.config.ts';
import { formatBundleFilename, writeBundles } from '../utils/rollup.ts';
import { localeRoot, wlOutput } from '../utils/paths.ts';
import type { Plugin } from 'rollup';

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;
export const buildFullModules = async () => {
  await buildLocales(false);
  await buildLocales(true);

  await buildFullEntry(false);
  await buildFullEntry(true);
};

export const buildLocales = async (minify: boolean) => {
  const files = await glob('**/*.{js,ts,vue}', {
    cwd: path.resolve(localeRoot, 'lang'),
    absolute: true,
    onlyFiles: true,
  });
  return Promise.all(
    files.map(async (file) => {
      //获取到文件名
      const filename = path.basename(file, '.ts');
      // 改为开头大写
      const name = upperFirst(camelCase(filename));
      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            minify,
            sourceMap: minify,
            target,
          }),
        ],
      });
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: path.resolve(
            wlOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'js')
          ),
          exports: 'default',
          name: `${PKG_CAMELCASE_LOCAL_NAME}${name}`,
          sourcemap: minify,
          banner,
        },
        {
          format: 'esm',
          file: path.resolve(
            wlOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'mjs')
          ),
          sourcemap: minify,
          banner,
        },
      ]);
    })
  );
};

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    vue(),
    vueJsx(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.vue': 'ts',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      treeShaking: true,
      legalComments: 'eof',
    }),
  ];

  if (minify) {
    //代码压缩
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true,
      })
    );
  }
  const bundle = await rollup({
    input: path.resolve(wlRoot, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
    // 是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），除非您发现由tree-shaking算法引起的bug，在这种情况下，请使用“treeshake：false”，一旦您提交了问题！
    treeshake: false,
  });

  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        wlOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        wlOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner,
    },
  ]);
}
