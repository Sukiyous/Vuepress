import type { Theme } from 'vuepress'
import process from 'node:process'
import { plumeTheme } from 'vuepress-theme-plume'

export const theme: Theme = plumeTheme({
  hostname: process.env.SITE_HOST || 'https://theme-plume.vuejs.press',

  //docsRepo: 'https://github.com/pengzhanbo/vuepress-theme-plume',
  docsRepo: 'https://github.com/Sukiyous/Vuepress',//编辑此页指向GitHub地址
  docsDir: 'docs',
  //changelog: { maxCount: 10 },//编辑此页更新日志
  //contributors: { mode: 'block' },//编辑此页贡献者
  changelog: false, // 禁用更新日志
  contributors: false, // 禁用贡献者显示
  search: { provider: 'local' },

  codeHighlighter: {
    twoslash: true,
    lineNumbers: 10,
  },

  markdown: {
    oldDemo: true,
    chartjs: true,
    echarts: true,
    markmap: true,
    plantuml: true,
    mermaid: true,
    flowchart: true,

    annotation: true,
    abbr: true,
    timeline: true,
    collapse: true,
    chat: true,
    codeTree: true,
    field: true,
    imageSize: 'all',
    pdf: true,
    caniuse: true,
    bilibili: true,
    youtube: true,
    artPlayer: true,
    audioReader: true,
    codepen: true,
    replit: true,
    codeSandbox: true,
    jsfiddle: true,
    demo: true,
    npmTo: ['pnpm', 'yarn', 'npm'],
    repl: {
      go: true,
      rust: true,
      kotlin: true,
    },
  },
// 禁用评论系统Giscus
  /**comment: {
    provider: 'Giscus',
    comment: true,
    repo: 'pengzhanbo/vuepress-theme-plume',
    repoId: 'R_kgDOG_ebNA',
    category: 'docs-comment',
    categoryId: 'DIC_kwDOG_ebNM4Cd0uF',
    mapping: 'pathname',
    reactionsEnabled: true,
    inputPosition: 'top',
    darkTheme: 'dark_protanopia',
    lightTheme: 'light_protanopia',
  },
*/
comment:false,

  watermark: {
    enabled: false,
    watermarkOptions: {
      content: 'vuepress-theme-plume',
    },
  },
})
