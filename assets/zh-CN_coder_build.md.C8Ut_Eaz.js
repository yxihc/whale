import{_ as s,c as a,o as n,aP as i}from"./chunks/framework.hr85244c.js";const o=JSON.parse('{"title":"项目构建","description":"","frontmatter":{"title":"项目构建"},"headers":[],"relativePath":"zh-CN/coder/build.md","filePath":"zh-CN/coder/build.md","lastUpdated":1717390615000}'),l={name:"zh-CN/coder/build.md"},p=i(`<h1 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-label="Permalink to &quot;构建&quot;">​</a></h1><blockquote><p>打包代码位于 /internal/build。 使用到的工具有：rollup、unbuild、esbuild、gulp、ts-morph、fast-glob 等</p></blockquote><h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><h2 id="源码" tabindex="-1">源码 <a class="header-anchor" href="#源码" aria-label="Permalink to &quot;源码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>internal/build</span></span>
<span class="line"><span>├── build.config.ts         # unbuild 配置文件</span></span>
<span class="line"><span>├── dist                    # 构建产物</span></span>
<span class="line"><span>├── gulpfile.ts             # 构建脚本</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>├── src</span></span>
<span class="line"><span>│   ├── build-info.ts       # 构建信息</span></span>
<span class="line"><span>│   ├── constants.ts        # 一些常量</span></span>
<span class="line"><span>│   ├── index.ts            # 入口文件</span></span>
<span class="line"><span>│   ├── tasks</span></span>
<span class="line"><span>│   │   ├── full-bundle.ts  # 构建完整产物</span></span>
<span class="line"><span>│   │   ├── index.ts</span></span>
<span class="line"><span>│   │   └── modules.ts      # 构建 bundleless 产物</span></span>
<span class="line"><span>│   └── utils               # 工具函数</span></span>
<span class="line"><span>│       ├── gulp.ts</span></span>
<span class="line"><span>│       ├── index.ts</span></span>
<span class="line"><span>│       ├── log.ts</span></span>
<span class="line"><span>│       ├── paths.ts</span></span>
<span class="line"><span>│       ├── pkg.ts</span></span>
<span class="line"><span>│       ├── process.ts</span></span>
<span class="line"><span>│       └── rollup.ts</span></span>
<span class="line"><span>└── tsconfig.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span>构建产物</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dist/</span></span>
<span class="line"><span>├── whale         # 最终构建产物</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── dist             # 完整构建产物</span></span>
<span class="line"><span>│   ├── es               # bundleless 构建产物，ESM 格式</span></span>
<span class="line"><span>│   ├── lib              # bundleless 构建产物，CJS 格式</span></span>
<span class="line"><span>│   ├── package.json</span></span>
<span class="line"><span>│   └── theme-chalk      # 样式产物</span></span>
<span class="line"><span>└── types                # 类型声明产物</span></span></code></pre></div><h2 id="构建流程" tabindex="-1">构建流程 <a class="header-anchor" href="#构建流程" aria-label="Permalink to &quot;构建流程&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">构建流程</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">首先可以看到在 package.json 文件中的 start 脚本，启动 Gulp 运行 gulpfile.ts 文件。这将运行 gulpfile 的默认导出。在 gulpfile.ts 文件中找到 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 相关代码就是构建流程了。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> clean 清理产物</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">调用一个 run 函数，将会在项目根目录运行 pnpm run clean，其作用为删除根目录下的 dist 文件夹，并且运行 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">packages 目录下每个包的 clean 脚本。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> createOutput 创建构建产物的目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">创建 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dist</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">element</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plus 文件夹。在上一步中，我们把 dist 目录整个删掉了，为了保证目录存在，需要把之前的 dist 目录创建回来。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> parallel</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这是多个并行的任务，因为构建每种不同类型的产物是可以同时进行的。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> buildModules 构建 Bundless 产物</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">将开启一个新进程开始执行 .</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tasks</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">modules.ts 中的 buildModules 函数。最后将在 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dist</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">element</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plus 下生成 es 与 lib 两个文件夹，分别为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ESM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 与 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CJS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 两种格式。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> buildFullBundle 构建完整产物</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">与上一步类似，将执行 .</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tasks</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">full</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bundle.ts 中的 buildFullBundle 函数。但这步比上一步多一个构建 locale，因为需要考虑在 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CDN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 场景下导入不同语言。另外，用户导入完整包可以不需要使用构建工具 （Vite、Webpack 等），需要我们需要还需要提供压缩版本，以便能够节省加载时间。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">buildFull 函数就提供了一个参数 minify，以便可以并行执行两个任务——一个压缩版本和一个不压缩的版本。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">buildFullEntry 函数就是构建完整产物的函数。除了没有使用 preserveModules 选项，与 buildModules 基本一致。提供了 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">UMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 与 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ESM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 两种格式。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">buildFullLocale 函数用来构建语言包。为 packages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">locale</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.ts 下的每个文件同时构建 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">UMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 与 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ESM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 两种格式的产物。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">同时，开启 minify 参数时会开启 sourceMap 选项，为开发时提供原始源码用来调试。</span></span></code></pre></div>`,7),e=[p];function t(h,k,E,d,r,c){return n(),a("div",null,e)}const u=s(l,[["render",t]]);export{o as __pageData,u as default};
