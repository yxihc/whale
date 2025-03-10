import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { rollup } from 'rollup';
import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash-es';
import { version } from '../../../../packages/whale/version';
import {
  PKG_BRAND_NAME,
  PKG_CAMELCASE_LOCAL_NAME,
  PKG_CAMELCASE_NAME,
  target,
} from '../build.config';
import {
  formatBundleFilename,
  generateExternal,
  writeBundles,
} from '../utils/rollup';
import { localeRoot, wlOutput, wlRoot } from '../utils/paths';
import type { Plugin } from 'rollup';
import type { TaskFunction } from 'gulp';

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    vue(),
    json(),
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
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ] as Plugin[];
  if (minify) {
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
    treeshake: true,
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

async function buildFullLocale(minify: boolean) {
  const files = await glob(`**/*.ts`, {
    cwd: path.resolve(localeRoot, 'lang'),
    absolute: true,
  });
  return Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.ts');
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
}

export const buildFullBundle: TaskFunction = async () => {
  await buildFullEntry(false);
  await buildFullEntry(true);
  await buildFullLocale(false);
  await buildFullLocale(true);
};
