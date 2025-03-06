import { parallel, series } from 'gulp';
import { withTaskName } from './utils/glup.ts';
import { buildModules } from './task/modules.ts';
import { buildFullModules } from './task/full-modules.ts';
import type { TaskFunction } from 'gulp';

// 1. series 方法 串行执行：任务按顺序依次执行，前一个任务完成后才开始下一个。
// 2. parallel 方法 并行执行：所有任务同时开始执行，互不依赖。

// Explicitly type the default export
const defaultTask: TaskFunction = series(
  parallel(withTaskName('kaishibiansa', buildFullModules))
);

export default defaultTask;
