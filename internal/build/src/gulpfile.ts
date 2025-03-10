import path from 'path';
import { copyFile, mkdir } from 'fs/promises';
import { parallel, series } from 'gulp';
import { withTaskName } from './utils/glup';
import { buildModulesComponents, buildModulesStyles } from './task/modules';
import { run } from './utils/process';
import { buildFullBundle } from './task/full-modules';
import {
  copyTypesDefinitions,
  generateTypesDefinitions,
} from './task/types-definitions';
import { projRoot, wlOutput, wlPackage } from './utils/paths';
import type { TaskFunction } from 'gulp';

export const copyFullStyle = async () => {
  await mkdir(path.resolve(wlOutput, 'dist'), { recursive: true });
  await copyFile(
    path.resolve(wlOutput, 'theme-chalk/index.css'),
    path.resolve(wlOutput, 'dist/index.css')
  );
};

export const copyFiles = () =>
  Promise.all([
    copyFile(wlPackage, path.join(wlOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(wlOutput, 'README.md')
    ),
    // copyFile(
    //   path.resolve(projRoot, 'typings', 'global.d.ts'),
    //   path.resolve(wlOutput, 'global.d.ts')
    // ),
  ]);

// 1. series 方法 串行执行：任务按顺序依次执行，前一个任务完成后才开始下一个。
// 2. parallel 方法 并行执行：所有任务同时开始执行，互不依赖。

const defaultTask: TaskFunction = series(
  withTaskName('clean', () => run('pnpm run clean')),
  parallel(
    withTaskName('分别编制所有组件和方法', buildModulesComponents),
    withTaskName('分别编制所有组件中的样式', buildModulesStyles),
    withTaskName('分别编制所有组件和方法-合并一个文件', buildFullBundle),
    withTaskName('编译.d.ts文件', generateTypesDefinitions),
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  ),
  copyTypesDefinitions,
  copyFiles
);

export default defaultTask;
