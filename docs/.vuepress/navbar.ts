import type { ThemeNavItem } from 'vuepress-theme-plume'
import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar: ThemeNavItem[] = defineNavbarConfig([
  {
    text: '指南',
    icon: 'icon-park-outline:guide-board',
    badge: '新',
    link: '/notes/theme/guide/quick-start/intro.md',
    activeMatch: '^/guide/',
  },
  {
    text: '配置',
    icon: 'icon-park-outline:setting-two',
    link: '/notes/theme/config/intro.md',
    activeMatch: '^/config/',
  },
])
