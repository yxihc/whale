// import path from 'path'
// import { copyFile, mkdir } from 'fs/promises'
// import { copy } from 'fs-extra'
import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import { projRoot, wlOutput, wlPackage } from '@whale/build-utils'
import { parallel, series } from 'gulp'

import { run, runTask, withTaskName } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(wlPackage, path.join(wlOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(wlOutput, 'README.md')
    ),
    // copyFile(
    //   path.resolve(projRoot, 'global.d.ts'),
    //   path.resolve(wlOutput, 'global.d.ts')
    // ),
  ])
export const copyFullStyle = async () => {
  await mkdir(path.resolve(wlOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(wlOutput, 'theme-chalk/index.css'),
    path.resolve(wlOutput, 'dist/index.css')
  )
}

// 打包流程控制 1.打包样式2.打包工具方法2.打包所有组件3.打包每个组件4.生成一个组件库5.发布组件
export default series(
  // series 串行执行命令 parallel：并行执行命令
  // 清理缓存和无用文件
  withTaskName('clean', () => run('pnpm run clean')),
  //创建输出文件
  withTaskName('createOutput', () => mkdir(wlOutput, { recursive: true })),

  parallel(
    // 把所有代码打包成js
    runTask('buildModules'),
    // 把package/whale 目录下所有使用的包打包成一个文件
    runTask('buildFullBundle'),
    //打包css
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  ),
  parallel(copyFiles)
)

// 导出所有资源 不然pnpm run start 找不到命令
export * from './src'
