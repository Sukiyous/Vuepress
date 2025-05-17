import type { ThemeNote } from 'vuepress-theme-plume'
import { defineNoteConfig } from 'vuepress-theme-plume'

export const themeGuide: ThemeNote = defineNoteConfig({
  dir: 'theme/guide',
  link: '/guide/',
  sidebar: [
    {
      text: '上手流程',
      collapsed: false,
      icon: 'carbon:idea',
      prefix: 'quick-start',
      items: [
        'intro',
        'mulu',
        'SettingsCenter',
      ],
    },
    {
      text: '基础档案',
      collapsed: false,
      icon: 'carbon:idea',
      prefix: 'quick-start',
      items: [
        'intro',
      ],
    },
    {
      text: '库存管理',
      icon: 'fluent-mdl2:edit-create',
      prefix: 'kucun',
      collapsed: false,
      items: [
        'ceshi',
      ],
    },
    {
      text: '零售促销',
      icon: 'lucide:box',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: 'GSP质管',
      icon: 'lucide:box',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: '医保管理',
      icon: 'lucide:box',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: '溯源监管',
      icon: 'lucide:box',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: '综合查询',
      icon: 'lucide:box',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: '报表分析',
      prefix: 'kucun',
      icon: 'uiw:component',
      collapsed: false,
      items: [
        'ceshi',
      ],
    },
    {
      text: '设置中心',
      icon: 'material-symbols:dashboard-customize-outline-rounded',
      collapsed: false,
      prefix: 'kucun',
      items: [
        'ceshi',
      ],
    },
    {
      text: '管理员',
      icon: 'mdi:api',
      prefix: 'admin',
      collapsed: false,
      items: [
        'ad',
      ],
    },
  ],
})
