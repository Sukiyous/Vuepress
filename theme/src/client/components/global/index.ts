// 全局组件注册
import type { App } from 'vue'
import OptimizedImage from './OptimizedImage.vue'

export function registerGlobalComponents(app: App): void {
  // 注册优化图片组件
  app.component('OptimizedImage', OptimizedImage)
}

// 直接导出组件，而不是导出整个 Vue 文件
export { OptimizedImage }
