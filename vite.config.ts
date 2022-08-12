import { resolve } from 'path'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { primaryColor } from './src/config/colorConfig'

export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': primaryColor,
        },
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `@import "@/styles/variable.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      imports: ['vue', '@vueuse/core', 'pinia'],
      dts: true,
      vueTemplate: true,
    }),
    UnoCSS(),
    Components({
      resolvers: [ArcoResolver()],
    }),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        customize: [/src\/utils/, /src\/assets/],
        arco: ['@arco-design/web-vue'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      // 百度翻译
      '/baiduApi': {
        target: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/baiduApi/, ''),
      },
      // 腾讯翻译
      '/tencentApi': {
        target: 'https://tmt.tencentcloudapi.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/tencentApi/, ''),
      },
      // 有道翻译
      '/youdaoApi': {
        target: 'http://openapi.youdao.com/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/youdaoApi/, ''),
      },
      // 彩云小译
      '/caiyunApi': {
        target: 'http://api.interpreter.caiyunai.com/v1/translator',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/caiyunApi/, ''),
      },
      // 阿里翻译
      '/aliApi': {
        target: 'http://mt.cn-hangzhou.aliyuncs.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/aliApi/, ''),
      },
      // 火山翻译
      '/huoshanApi': {
        target: 'https://open.volcengineapi.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/huoshanApi/, ''),
      },
      // 接口
      '/uniapi': {
        target: 'https://be392405-5b88-4143-ad6b-f155b106ab85.bspapp.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/uniapi/, ''),
      },
    },
  },
})
