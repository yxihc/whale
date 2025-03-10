import { buildRoot } from './paths';
import { run } from './process';
import type { TaskFunction } from 'gulp';

export function withTaskName<T extends TaskFunction>(
  name: string,
  fn: T
): T & { displayName: string } {
  return Object.assign(fn, { displayName: name });
}

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  );
