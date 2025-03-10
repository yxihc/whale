# Element Plus 源码分析

> WIP

## 项目概述

- 官网：https://element-plus.org/
- GitHub 仓库：https://github.com/element-plus/element-plus
- 包管理：pnpm workspace
- 组件代码：TypeScript、Vue SFC（Vue 单文件组件）
- 样式：Scss、CSS var
- 单元测试：Jest、Vitest
- 构建：Rollup、ESBuild、TypeScript、Gulp
- 代码风格：ESLint、Prettier

如有错误之处，欢迎指正。

## 构建

- Keywords: `Vue SFC`, `Rollup`, `Bundleless`, `TypeScript`, `ESM`, `CommonJS`/`CJS`, `UMD`

这部分在一个单独的包 `@element-plus/build`，代码位于 `/internal/build`。

使用到的工具有：`rollup`、`unbuild`、`esbuild`、`gulp`、`ts-morph`、`fast-glob` 等。如需深度理解，建议先自行了解这些包后阅读本章节。

### 目录结构

#### 源码

```
internal/build
├── build.config.ts        	# unbuild 配置文件
├── dist                    # 构建产物
├── gulpfile.ts             # 构建脚本
├── package.json
├── src
│   ├── build-info.ts       # 构建信息
│   ├── constants.ts        # 一些常量
│   ├── index.ts            # 入口文件
│   ├── plugins             # 插件
│   │   └── element-plus-alias.ts
│   ├── tasks
│   │   ├── full-bundle.ts  # 构建完整产物
│   │   ├── helper.ts       # 生成 WebStorm 提示文件
│   │   ├── index.ts
│   │   ├── modules.ts      # 构建 bundleless 产物
│   │   └── types-definitions.ts # 生成 d.ts 文件
│   ├── type-safe.json      # 「类型安全」列表
│   └── utils               # 工具函数
│       ├── gulp.ts
│       ├── index.ts
│       ├── log.ts
│       ├── paths.ts
│       ├── pkg.ts
│       ├── process.ts
│       └── rollup.ts
├── tsconfig.json
└── vue-jest-transformer.js
```

#### 构建产物

[在线预览](https://cdn.jsdelivr.net/npm/element-plus@latest/)

```
dist/
├── element-plus         # 最终构建产物
│   ├── README.md
│   ├── attributes.json
│   ├── dist             # 完整构建产物
│   ├── es               # bundleless 构建产物，ESM 格式
│   ├── global.d.ts      # 供 Volar 使用的全局组件类型
│   ├── lib              # bundleless 构建产物，CJS 格式
│   ├── package.json
│   ├── tags.json
│   ├── theme-chalk      # 样式产物
│   └── web-types.json
└── types                # 类型声明产物
```

### 构建流程

首先可以看到在 `package.json` 文件中的 `start` 脚本，启动 gulp 运行 `gulpfile.ts` 文件。这将运行 `gulpfile` 的默认导出。在 `gulpfile.ts` 文件中找到 `export default` 相关代码就是构建流程了。

#### 0. `clean` 清理产物

调用一个 `run` 函数，将会在项目根目录运行 `pnpm run clean`，其作用为删除根目录下的 `dist` 文件夹，并且运行 `/packages` 目录下每个包的 `clean` 脚本。

#### 1. `createOutput` 创建构建产物的目录

创建 `/dist/element-plus` 文件夹。在上一步中，我们把 `dist` 目录整个删掉了，为了保证目录存在，需要把之前的 `dist` 目录创建回来。

#### 2. parallel

这是多个并行的任务，因为构建每种不同类型的产物是可以同时进行的。

#### 2.1 `buildModules` 构建 Bundless 产物

将开启一个新进程开始执行 `./src/tasks/modules.ts` 中的 `buildModules` 函数。最后将在 `/dist/element-plus/` 下生成 `es` 与 `lib` 两个文件夹，分别为 ESM 与 CJS 两种格式。

#### 2.2 `buildFullBundle` 构建完整产物

与上一步类似，将执行 `./src/tasks/full-bundle.ts` 中的 `buildFullBundle` 函数。但这步比上一步多一个构建 `locale`，因为需要考虑在 CDN 场景下导入不同语言。另外，用户导入完整包可以不需要使用构建工具 （Vite、Webpack 等），需要我们需要还需要提供压缩版本，以便能够节省加载时间。

`buildFull` 函数就提供了一个参数 `minify`，以便可以并行执行两个任务——一个压缩版本和一个不压缩的版本。

`buildFullEntry` 函数就是构建完整产物的函数。除了没有使用 `preserveModules` 选项，与 `buildModules` 基本一致。提供了两种格式 UMD 与 ESM。

`buildFullLocale` 函数为了构建语言包。为 `packages/locale/**/*.ts` 下的每个文件同时构建 UMD 与 ESM 两种格式的产物。

同时，开启 `minify` 参数时会开启 `sourceMap` 选项，为开发时提供原始源码用来调试。

#### 2.3 `generateTypesDefinitions` 生成 `.d.ts` 文件

为了用户开发时提供类型支持，还需要同时生成 `.d.ts`。将执行 `./src/tasks/types-definitions.ts` 中的 `generateTypesDefinitions` 函数。最后将 `.d.ts` 写入到 `/dist/types` 目录中。

#### 2.4 `buildHelper` 生成 IDE 支持

对于 WebStorm 与 Vetur，需要生成 `web-types.json` 与 `tags.json`、`attributes.json` 文件供插件分析，最终提供代码提示。使用了 [components-helper](https://github.com/tolking/components-helper) 分析文档 Markdown 生成。

开发 Vue 3 应用还是推荐使用 VSCode + Volar，这部分可能以后会被移除。因为用文档生成上述文件并不可靠。

#### 2.5 `buildThemeChalk` `copyFullStyle`  构建并复制样式

`buildThemeChalk`：这步将先执行 `buildThemeChalk`，从 sass 构建为 CSS 产物。相关代码位于 `packages/theme-chalk/gulpfile.ts`。最终把产物从 `packages/theme-chalk/dist` 复制到 `dist/element-plus/theme-chalk`。

`copyFullStyle`：将复制 `dist/element-plus/theme-chalk/index.css` 到 `dist/element-plus/dist/index.css`。把完整的 CSS 样式复制到「完整构建产物」的目录中，方便 CDN 引入。

#### 3. `copyTypesDefinitions` 复制 `.d.ts` 文件

因为有 ESM 与 CJS 两种格式都需要类型声明文件，所以没有一开始就生成到「最终构建产物」目录。最后将「类型声明产物」的所有文件复制到 `dist/element-plus/es` 与 `dist/element-plus/lib` 中即可。

以上就是所有流程。

### Rollup 插件

「完整构建产物」与「bundleless 构建产物」都使用到了 Rollup。

Rollup 是不能解析像 TypeScript、Vue SFC 这些非 JavaScript 的代码，所以需要借助各种插件，来帮助 Rollup 将其转换为 JavaScript 代码。Rollup 也不能解析 CommonJS 格式的代码，还需要插件来帮助 Rollup 解决这些问题。

#### [`unplugin-vue-define-options`](https://github.com/sxzz/unplugin-vue-define-options)

这是我个人写的一个插件。有了这个插件就可以在 Vue 的 `<script setup>` 中使用 `Options API` 。Element Plus 需要定义组件 `name`  属性，这样子就可以避免两个 `script` 标签了。

#### [`@vitejs/plugin-vue`](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)

Vite 官方插件，把 Vue SFC 编译为 JavaScript 代码。

#### [`@vitejs/plugin-vue-jsx`](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)

Vite 官方插件，支持 Vue JSX 语法。

#### [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

Rollup 官方插件，让 Rollup 支持 Node.js 的[解析算法](https://nodejs.org/api/modules.html#modules_all_together)，用于解析 `node_modules`。

`extensions` 选项：默认是不包含 `.ts` 后缀名的，所以需要手动加上。

#### [`@rollup/plugin-commonjs`](https://github.com/rollup/plugins/tree/master/packages/commonjs)

Rollup 官方插件，用于将 CommonJS 模块转换为 ES6，这样就可以被 Rollup 解析。

#### [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild)

一个强大、高效、好用的插件！用于把 TypeScript 转换为 JavaScript，并可以用于压缩代码、转换语法。基于 [ESBuild](https://esbuild.github.io/)，速度极快。

`minify` 选项：是否压缩代码。

`target` 选项：向下兼容低版本浏览器。Element Plus 最低兼容 `ES2018`，但在开发中会使用到一些新语法（比如 [Optional chaining](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 等），所以需要借助 ESBuild 的能力，把语法糖转换为能兼容 ES2018 的代码。

`loaders` 选项：通过 `@vitejs/plugin-vue` 插件编译后，Vue SFC 就是普通的 JavaScript 代码了，但是其后缀还是 `.vue` 。所以需要添加 `'.vue': 'ts',`，把 `.vue` 文件看作普通的 `.js` 文件。

### Rollup 配置

#### [`external`](https://esbuild.github.io/api/#external)

当构建 bundless 时，将 `dependencies` 和 `peerDependencies` 排除在构建产物之外。

当构建完整产物时，将 `peerDependencies` （也就是 `vue`）排除在构建产物之外。

#### [`preserveModules`](https://rollupjs.org/guide/en/#outputpreservemodules)

开启后，构建产物将保持与源码一样的文件结构。

可以理解为仅把 Vue SFC、TypeScript 等转换成了 JavaScript 代码，其他不变。

### 其他代码分析

#### `build.config.ts`

使用 [unbuild](https://github.com/unjs/unbuild) 生成开发时 stub，开发调试用。这样就不用 watch 一直监听文件构建。

#### `src/type-safe.json`

因为 Element Plus 的代码目前还有 TypeScript 类型产物，但已经重构完成了部分文件。这个文件就是记录已重构完成的列表。为了在生成 `.d.ts` 是针对这部分文件做异常处理。

#### `src/build-info.ts`

将构建的配置集中写在这个文件中，包括路径、构建格式、后缀名等。

### 生成 `.d.ts` 类型定义

代码位于在 `generateTypesDefinitions` 步骤中。这里使用了 `ts-morph` 简化 TypeScript 编译调用。首先[创建一个 `Project`](https://github.com/element-plus/element-plus/blob/bb939c6a58610cbea08b32e52dcebee6afc17202/internal/build/src/tasks/types-definitions.ts#L35-L51) 并指定配置，用于覆盖 `tsconfig.json` 的配置。`skipAddingFilesFromTsConfig`  设置为 `false` 的目的是，我们需要手动选择文件到编译器中。[通过 `glob` 匹配所有源码文件](https://github.com/element-plus/element-plus/blob/bb939c6a58610cbea08b32e52dcebee6afc17202/internal/build/src/tasks/types-definitions.ts#L53-L60)，并[过滤掉仅用于测试与开发的文件](https://github.com/element-plus/element-plus/blob/bb939c6a58610cbea08b32e52dcebee6afc17202/internal/build/src/tasks/types-definitions.ts#L61-L66)。获取到文件列表后，需要把文件添加到 TypeScript 编译器中。

值得注意的是 Vue SFC 不可以直接添加到编译器中，因为 TypeScript 无法解析它。所以需要使用 `vue/compiler-sfc` 中的 `parse` 和 `compileScript` 把 `script` 块中的代码提取出来，并编译 `<script setup>` 的代码。之后再添加到编译器中。

另外，由于构建产物的目录结构与我们实际的源码目录结构不一样。所以这里要特殊处理下——[手动读取文件内容并添加到编译器中](https://github.com/element-plus/element-plus/blob/bb939c6a58610cbea08b32e52dcebee6afc17202/internal/build/src/tasks/types-definitions.ts#L97-L102)。

还需要工具「类型安全」列表中的文件进行匹配，如果列表中的文件有类型错误，则直接报错。可以防止意外造成的 TypeScript 错误。后续将陆续完成代码重构，保证 0 TypeScript 错误。

最后就是把编译好的 `.d.ts` 文件写入到构建目录即可。

### 未来

我写了一个[新的构建流程](https://github.com/sxzz/element-plus-next/tree/main/packages/build-cli)，将来可能在 Element Plus 3 中使用到。全程使用 ESBuild 构建，速度应该会快很多。另外，未来可能将只构建 ESM 和 IIFE 格式的版本。因此，Bundleless 构建产物也可以去掉。

## 代码风格

这部分在一个单独的包 `@element-plus/eslint-config`，代码位于 `/internal/eslint-config`。

如果想给 Element Plus 贡献代码，请务必确保代码风格没有问题。可以运行 `pnpm run lint` 来检查是否存在问题，并使用 `pnpm run lint:fix` 自动修复问题。

### ESLint

Element Plus 使用 ESLint 来管理代码风格，同时使用了多个插件来支持不同的文件类型。支持的文件类型有：JavaScript、TypeScript、JSX/TSX、Vue SFC、Markdown、JSON、JSON5，详见 [`.vscode/settings.json`](https://github.com/element-plus/element-plus/blob/80d903771f89e87c80ce4f5518c61245213f6add/.vscode/settings.json#L17-L27) 的配置项 `eslint.validate`。

### Prettier

总体上使用 Prettier 来约束代码风格，详见 [Prettier 配置文件](https://github.com/element-plus/element-plus/blob/2f9cdc74ce2e19d353050093cc9b14071d283b25/.prettierrc)。并使用 Prettier 插件和预设规则与 ESLint 集成。


