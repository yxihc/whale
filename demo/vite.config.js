import {defineConfig, loadEnv} from 'vite'
import createVitePlugins from './vite/plugins'
import path from "path";
export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。

    // 注意 Vite 默认是不加载 .env 文件的，因为这些文件需要在执行完 Vite 配置后才能确定加载哪一个，
    // 举个例子，root 和 envDir 选项会影响加载行为。
    // 不过当你的确需要时，你可以使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件。
    const env = loadEnv(mode, process.cwd() + '/env', '')
    return {
        // vite 配置
        // 开发或生产环境服务的公共基础路径。合法的值包括以下几种：
        // 绝对 URL 路径名，例如 /foo/
        // 完整的 URL，例如 https://foo.com/
        // 空字符串或 ./（用于嵌入形式的开发）
        base: process.env.NODE_ENV === 'production' ? './' : './',
        plugins: createVitePlugins(env, command === 'build'),
        // 路由配置
        resolve: {
            // https://cn.vitejs.dev/config/#resolve-alias
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                // 设置别名
                '@': path.resolve(__dirname, './src')
            },
            // https://cn.vitejs.dev/config/#resolve-extensions
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        server: {
            port: 80,
            host: true,
            open: false,
            proxy: {
                // '/dev-api': {
                //     target: 'http://localhost:8080',
                //     changeOrigin: true,
                //     rewrite: (p) => p.replace(/^\/dev-api/, '')
                // }
            }
        },
        // preview 命令会启动一个本地静态 Web 服务器，将 dist 文件夹运行在 http://localhost:xx、
        preview: {
            port: 90,
            host: true,
            open: true,
            proxy: {
                // '/dev-api': {
                //     target: 'http://localhost:8080',
                //     changeOrigin: true,
                //     rewrite: (p) => p.replace(/^\/dev-api/, '')
                // }
            }
        },
    }
})