import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';
import { copy, remove } from 'fs-extra';
import { parallel } from 'gulp';
import { buildOutput, wlOutput } from '../utils/paths';
import { run } from '../utils/process';
import { pathRewriter } from '../utils/pkg';
import { PKG_NAME } from '../build.config';
import { withTaskName } from '../utils/glup';
import type { TaskFunction } from 'gulp';
import type { CopyOptions } from 'fs-extra';

export const generateTypesDefinitions = async () => {
  await run(
    'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  );
  const typesDir = path.join(buildOutput, 'types', 'packages');

  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true,
  });
  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, pathRewriter(content), 'utf8');
  });
  await Promise.all(rewriteTasks);
  const sourceDir = path.join(typesDir, PKG_NAME);
  await copy(sourceDir, typesDir);
  await remove(sourceDir);
};

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages');
  const copyTypes = (module: 'esm' | 'cjs') =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(
        src,
        module === 'esm'
          ? path.resolve(wlOutput, 'es')
          : path.resolve(wlOutput, 'lib'),
        { recursive: true } as CopyOptions
      )
    );
  return parallel(copyTypes('esm'), copyTypes('cjs'))(done);
};
