import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {fileURLToPath} from "url";
import {visualizer} from "rollup-plugin-visualizer";

import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
        }),

        compression({
            verbose: true,
            disable: false,
            // threshold: 10240, // 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 菜压缩
            threshold: 1024 * 300, // 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 菜压缩
            algorithm: 'gzip', // 压缩算法
            ext: '.gz', // 压缩文件后缀名
        }),
        visualizer(),
    ],

    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8899",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/back": {
                target: "http://pic.nwyzx.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/back/, ""),
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
        preprocessorOptions: {
            less: {
                // additionalData: `@import "@/assets/css/variable.less";`
            }
        }
    },
    build: {
        // chunkSizeWarningLimit: 1024
    }
})
