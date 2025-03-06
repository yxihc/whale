// 查找文件
import glob from 'fast-glob';
//packages 项目路径
import { excludeFiles, pkgRoot, wlRoot } from '@whale/build-utils';
import DefineOptions from 'unplugin-vue-define-options/rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { generateExternal, writeBundles } from '../utils';
import { buildConfigEntries, target } from '../build-info';
import type { OutputOptions } from 'rollup';

// 异步打包packages函数
export const buildModules = async () => {
  // 找到package下所有的代码文件
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );

  const bundle = await rollup({
    //需要打包的文件
    input,
    //打包插件
    plugins: [
      DefineOptions(),
      vue(),
      vueJsx(),
      commonjs(),
      esbuild({
        sourceMap: true,
        // 为了应对 umd 直接加载到浏览器里，构建目标需要设定得兼容性更强
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    // 是否应用tree-shaking。建议您省略此选项（默认为treeshake：true），除非您发现由tree-shaking算法引起的bug，在这种情况下，请使用“treeshake：false”，一旦您提交了问题！
    treeshake: false,
    // 使用rollup打包，比如我们在自己的库中需要使用第三方库，例如jquery等，又不想在最终生成的打包文件中出现jquery。这个时候我们就需要使用external属性。
    external: await generateExternal({ full: false }),
  });

  const outputOptions = buildConfigEntries.map(([module, config]) => {
    return {
      // String 生成包的格式。 下列之一:
      // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
      // esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
      format: config.format,
      dir: config.output.path,
      // String 使用什么导出模式。默认为auto，它根据entry模块导出的内容猜测你的意图：
      // default – 如果你使用 export default ... 仅仅导出一个东西，那适合用这个
      //   named – 如果你导出多个东西，适合用这个
      //   none – 如果你不导出任何内容 (例如，你正在构建应用程序，而不是库)，则适合用这个
      exports: module === 'cjs' ? 'named' : undefined,
      preserveModules: true,
      preserveModulesRoot: wlRoot,
      sourcemap: true,
      entryFileNames: `[name].${config.ext}`,
    };
  }) as OutputOptions[];
  await writeBundles(bundle, outputOptions);
};
