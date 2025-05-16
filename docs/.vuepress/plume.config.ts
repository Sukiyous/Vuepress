import type { ThemeConfig } from 'vuepress-theme-plume'
import path from 'node:path'
import { defineThemeConfig } from 'vuepress-theme-plume'
import { zhNavbar } from './navbar.js'
import { zhNotes } from './notes/index.js'

export default defineThemeConfig({
  logo: '/plume.png',

  profile: {
    // 头像图片路径
    avatar: '/plume.png',
    // 名称
    name: 'Plume Theme',
    // 描述信息
    description: 'The Theme for Vuepress 2.0',
    // 地理位置
    location: 'GuangZhou, China',
    // 组织/公司
    organization: 'pengzhanbo',
  },

  social: [
    { icon: 'github', link: 'https://github.com/Sukiyous/Vuepress' },
    { icon: 'qq', link: 'https://qm.qq.com/q/szC5XmCQ5G' },
  ],
  navbarSocialInclude: ['github', 'qq'],

  footer: {
    message: '云药家',
    copyright: 'Copyright © 2025-present Djc',
  },

  locales: {
    '/': {
      notes: zhNotes,
      navbar: zhNavbar,
    },
  },

  encrypt: {
    rules: {
      '/article/enx7c9s/': '123456',
    },
  },
  autoFrontmatter: { exclude: ['**/*.snippet.*'] },

  bulletin: {
    layout: 'top-right',
    lifetime: 'always',
    // title: '🎉 公告 🎉',
    contentFile: path.join(__dirname, 'bulletin.md'),
    enablePage: page => page.path === '/guide/features/bulletin/',
  },
}) as ThemeConfig
