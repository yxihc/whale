import { wlOutput, wlRoot } from './utils/paths.ts';
import type { OutputOptions } from 'rollup';

export const PKG_PREFIX = '@whale';
export const PKG_NAME = 'whale';
export const PKG_CAMELCASE_NAME = 'Whale';
export const PKG_CAMELCASE_LOCAL_NAME = 'WhaleLocale';
export const PKG_BRAND_NAME = 'Whale';

export const REPO_OWNER = 'whale';
export const REPO_NAME = 'whale';
export const REPO_PATH = `${REPO_OWNER}/${REPO_NAME}`;
export const REPO_BRANCH = 'dev';

export const target = 'es2018';
export const moduleOutputs = [
  {
    format: 'esm',
    dir: `${wlOutput}/${PKG_NAME}/es`,
    exports: undefined,
    preserveModules: true,
    preserveModulesRoot: wlRoot,
    sourcemap: true,
    entryFileNames: '[name].mjs',
  },
  {
    format: 'cjs',
    dir: `${wlOutput}/${PKG_NAME}/lib`,
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: wlRoot,
    sourcemap: true,
    entryFileNames: '[name].js',
  },
] as OutputOptions[];
