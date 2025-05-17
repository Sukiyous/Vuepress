import type { ClientConfig } from 'vuepress/client'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import { defineClientConfig } from 'vuepress/client'
// import AsideNav from '~/components/AsideNav.vue'
import { setupThemeColors } from '~/composables/theme-colors.js'

export default defineClientConfig({
  setup() {
    setupThemeColors()
  },
  layouts: {
    // 注释掉AsideNav组件的使用
    // Layout: h(Layout, null, {
    //   'aside-outline-after': () => h(AsideNav),
    // }),
    Layout: h(Layout),
  },
}) as ClientConfig
