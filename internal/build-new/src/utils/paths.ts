import { resolve } from 'path';

// 列出所有的文件路径
export const projRoot = resolve(__dirname, '..', '..', '..', '..');
// packages包路径
export const pkgRoot = resolve(projRoot, 'packages');
// 组件库路径
export const compRoot = resolve(pkgRoot, 'components');
// css样式路径
export const themeRoot = resolve(pkgRoot, 'theme-chalk');
// hooks路径
export const hookRoot = resolve(pkgRoot, 'hooks');
export const localeRoot = resolve(pkgRoot, 'locale');
export const directiveRoot = resolve(pkgRoot, 'directives');

//本项目路径
export const wlRoot = resolve(pkgRoot, 'whale');
export const utilRoot = resolve(pkgRoot, 'utils');
export const buildRoot = resolve(projRoot, 'internal', 'build-new');

// Docs
export const docsDirName = 'docs';
export const docRoot = resolve(projRoot, docsDirName);
export const vpRoot = resolve(docRoot, '.vitepress');

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist');
/** `/dist/whale` */
export const wlOutput = resolve(buildOutput, 'whale');

export const projPackage = resolve(projRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const themePackage = resolve(themeRoot, 'package.json');
export const hookPackage = resolve(hookRoot, 'package.json');
export const directivePackage = resolve(directiveRoot, 'package.json');
export const wlPackage = resolve(wlRoot, 'package.json');
export const utilPackage = resolve(utilRoot, 'package.json');
export const docPackage = resolve(docRoot, 'package.json');
