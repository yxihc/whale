import path from 'path'
import { wlOutput } from '@whale/build-utils'
import { PKG_NAME } from '@whale/build-constants'

import type { ModuleFormat } from 'rollup'
export const target = 'es2018'

export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/whale/es` */
    path: string
  }

  bundle: {
    /** e.g: `ewhale/es` */
    path: string
  }
}
export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs', //将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    output: {
      name: 'es',
      path: path.resolve(wlOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs', //CommonJS，适用于 Node 和 Browserify/Webpack
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(wlOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
}
export type BuildConfigEntries = [Module, BuildInfo][]

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries
