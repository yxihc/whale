import path from 'path';
import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash-es';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { target } from '@whale/build/src/build-info.ts';
import { localeRoot, wlOutput } from '../utils/paths.ts';
import { formatBundleFilename, writeBundles } from '../utils/rollup.ts';
import { PKG_BRAND_NAME, PKG_CAMELCASE_LOCAL_NAME } from '../build.config.ts';
import { version } from '../../../../packages/whale/version';

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;
export const buildFullModules = async () => {
  await Promise.all([buildLocales(false), buildLocales(true)]);
};

export const buildLocales = async (minify: boolean) => {
  const files = await glob(`${path.resolve(localeRoot, 'lang')}/*.ts`, {
    absolute: true,
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
