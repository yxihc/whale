---
title: 项目构建
---

# 构建
> 打包代码位于 /internal/build。 使用到的工具有：rollup、unbuild、esbuild、gulp、ts-morph、fast-glob 等


# 目录结构

## 源码
```
internal/build
├── build.config.ts         # unbuild 配置文件
├── dist                    # 构建产物
├── gulpfile.ts             # 构建脚本
├── package.json
├── src
│   ├── build-info.ts       # 构建信息
│   ├── constants.ts        # 一些常量
│   ├── index.ts            # 入口文件
│   ├── tasks
│   │   ├── full-bundle.ts  # 构建完整产物
│   │   ├── index.ts
│   │   └── modules.ts      # 构建 bundleless 产物
│   └── utils               # 工具函数
│       ├── gulp.ts
│       ├── index.ts
│       ├── log.ts
│       ├── paths.ts
│       ├── pkg.ts
│       ├── process.ts
│       └── rollup.ts
└── tsconfig.json

构建产物

dist/
├── whale         # 最终构建产物
│   ├── README.md
│   ├── dist             # 完整构建产物
│   ├── es               # bundleless 构建产物，ESM 格式
│   ├── lib              # bundleless 构建产物，CJS 格式
│   ├── package.json
│   └── theme-chalk      # 样式产物
└── types                # 类型声明产物
```

## 构建流程
```js
构建流程
首先可以看到在 package.json 文件中的 start 脚本，启动 Gulp 运行 gulpfile.ts 文件。这将运行 gulpfile 的默认导出。在 gulpfile.ts 文件中找到 export default 相关代码就是构建流程了。

0. clean 清理产物
调用一个 run 函数，将会在项目根目录运行 pnpm run clean，其作用为删除根目录下的 dist 文件夹，并且运行 /packages 目录下每个包的 clean 脚本。

1. createOutput 创建构建产物的目录
创建 /dist/element-plus 文件夹。在上一步中，我们把 dist 目录整个删掉了，为了保证目录存在，需要把之前的 dist 目录创建回来。

2. parallel
这是多个并行的任务，因为构建每种不同类型的产物是可以同时进行的。

2.1 buildModules 构建 Bundless 产物
将开启一个新进程开始执行 ./src/tasks/modules.ts 中的 buildModules 函数。最后将在 /dist/element-plus 下生成 es 与 lib 两个文件夹，分别为 ESM 与 CJS 两种格式。

2.2 buildFullBundle 构建完整产物
与上一步类似，将执行 ./src/tasks/full-bundle.ts 中的 buildFullBundle 函数。但这步比上一步多一个构建 locale，因为需要考虑在 CDN 场景下导入不同语言。另外，用户导入完整包可以不需要使用构建工具 （Vite、Webpack 等），需要我们需要还需要提供压缩版本，以便能够节省加载时间。

buildFull 函数就提供了一个参数 minify，以便可以并行执行两个任务——一个压缩版本和一个不压缩的版本。

buildFullEntry 函数就是构建完整产物的函数。除了没有使用 preserveModules 选项，与 buildModules 基本一致。提供了 UMD 与 ESM 两种格式。

buildFullLocale 函数用来构建语言包。为 packages/locale/**/*.ts 下的每个文件同时构建 UMD 与 ESM 两种格式的产物。

同时，开启 minify 参数时会开启 sourceMap 选项，为开发时提供原始源码用来调试。


```
