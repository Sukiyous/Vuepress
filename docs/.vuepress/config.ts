import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { App, UserConfig } from 'vuepress'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { viteBundler } from '@vuepress/bundler-vite'
import { addViteOptimizeDepsInclude, addViteSsrExternal } from '@vuepress/helper'
import pwaPlugin from '@vuepress/plugin-pwa'
import { defineUserConfig } from 'vuepress'
import { theme } from './theme.js'

const pnpmWorkspace = fs.readFileSync(path.resolve(__dirname, '../../pnpm-workspace.yaml'), 'utf-8')
const vuepress = pnpmWorkspace.match(/vuepress:\s2.+/)?.[0]?.split(' ')[1] || ''

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  source: path.resolve(__dirname, '../'),
  public: path.resolve(__dirname, 'public'),

  locales: {
    '/': { title: '云药家', lang: 'zh-CN' },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/Vuepress/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/Vuepress/favicon-16x16.png' }],
    ['meta', { name: 'google-site-verification', content: 'AaTP7bapCAcoO9ZGE67ilpy99GL6tYqtD30tRHjO9Ps' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/images/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules', '!docs/notes/theme/guide/代码演示/demo/*'],

  extendsBundlerOptions(bundlerOptions: ViteBundlerOptions, app: App) {
    addViteOptimizeDepsInclude(bundlerOptions, app, '@simonwep/pickr')
    addViteSsrExternal(bundlerOptions, app, '@simonwep/pickr')

    // 优化 Vite 配置，启用构建优化
    if (bundlerOptions.viteOptions && bundlerOptions.viteOptions.build) {
      bundlerOptions.viteOptions.build.minify = 'terser'
      bundlerOptions.viteOptions.build.chunkSizeWarningLimit = 2000
      bundlerOptions.viteOptions.build.terserOptions = {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production',
        },
      }

      // 配置资源压缩
      bundlerOptions.viteOptions.build.rollupOptions = {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router'],
            vendors: ['@vue/shared'],
          },
        },
      }
    }
  },

  define: {
    __VUEPRESS_VERSION__: vuepress,
    // debug hydration mismatch
    // __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },

  alias: {
    '~/theme': path.resolve(__dirname, './themes'),
    '~/components': path.resolve(__dirname, './themes/components'),
    '~/composables': path.resolve(__dirname, './themes/composables'),
  },

  bundler: viteBundler({
    viteOptions: {
      build: {
        // 启用资源内联、CSS 分离和资源压缩
        cssCodeSplit: true,
        assetsInlineLimit: 4096,
        rollupOptions: {
          output: {
            // 按类型拆分代码
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
            assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          },
        },
      },
      // 添加 Gzip 预压缩配置
      plugins: [
        {
          name: 'vite-plugin-compression',
          apply: 'build',
          enforce: 'post',
          transformIndexHtml(html: string) {
            return html
          },
          configResolved(config: any) {
            const { root, build } = config
            const { outDir } = build
            // 编译后执行压缩
            config.build.rollupOptions.plugins = [
              ...(config.build.rollupOptions.plugins || []),
              {
                name: 'vite:compression',
                async generateBundle() {
                  try {
                    const fs = await import('node:fs')
                    const path = await import('node:path')
                    const zlib = await import('node:zlib')
                    const util = await import('node:util')
                    const compress = util.promisify(zlib.gzip)

                    const walkDir = async (dir: string) => {
                      const files = await fs.promises.readdir(dir)
                      for (const file of files) {
                        const filePath = path.join(dir, file)
                        const stat = await fs.promises.stat(filePath)
                        if (stat.isDirectory()) {
                          await walkDir(filePath)
                        }
                        else if (/\.(?:js|css|html|svg|json)$/.test(file)) {
                          const content = await fs.promises.readFile(filePath)
                          const compressedContent = await compress(content)
                          await fs.promises.writeFile(`${filePath}.gz`, compressedContent)
                        }
                      }
                    }

                    await walkDir(path.resolve(root, outDir))
                    // 压缩完成
                  }
                  catch (error) {
                    console.error('压缩失败:', error)
                  }
                },
              },
            ]
          },
        },
      ],
    },
  }),
  shouldPrefetch: false,

  plugins: [
    pwaPlugin({
      skipWaiting: true,
      // 缓存SW更新弹窗
      popupComponent: '@vuepress/plugin-pwa/lib/client/components/SWUpdatePopup.js',
    }),
  ],

  theme,
}) as UserConfig
