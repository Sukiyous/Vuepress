<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  webpSrc: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: null,
  },
  height: {
    type: [String, Number],
    default: null,
  },
  media: {
    type: String,
    default: '',
  },
})

const loaded = ref(false)
const isVisible = ref(false)
const hasError = ref(false)

const containerStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return style
})

// 图片加载处理
function onLoad() {
  loaded.value = true
}

function onError() {
  hasError.value = true
  loaded.value = true
}

// 懒加载处理
let observer: IntersectionObserver | null = null

function setupIntersectionObserver() {
  // 如果浏览器支持 IntersectionObserver
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        isVisible.value = true
        // 图片已可见，停止观察
        if (observer) {
          observer.disconnect()
          observer = null
        }
      }
    }, {
      rootMargin: '200px', // 提前 200px 加载
      threshold: 0,
    })

    onMounted(() => {
      const el = document.querySelector('.optimized-image-container') as Element
      if (el && observer) {
        observer.observe(el)
      }
      else {
        // 降级：如果没有找到元素或不支持观察，直接显示
        isVisible.value = true
      }
    })

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    })
  }
  else {
    // 降级：如果不支持 IntersectionObserver，直接显示图片
    isVisible.value = true
  }
}

// 初始化懒加载
setupIntersectionObserver()
</script>

<template>
  <div class="optimized-image-container" :style="containerStyle">
    <picture v-if="isVisible">
      <!-- WebP 格式 -->
      <source
        v-if="webpSrc"
        :srcset="webpSrc"
        type="image/webp"
        :media="media"
      >
      <!-- 原始图片 -->
      <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        loading="lazy"
        decoding="async"
        class="optimized-image" :class="[{ 'optimized-image-loaded': loaded }]"
        @load="onLoad"
        @error="onError"
      >
    </picture>
    <div v-if="!loaded && isVisible" class="optimized-image-placeholder" />
  </div>
</template>

<style scoped>
.optimized-image-container {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  line-height: 0;
  background-color: #f5f5f5;
}

.optimized-image {
  max-width: 100%;
  height: auto;
  background-color: #f5f5f5;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.optimized-image-loaded {
  opacity: 1;
}

.optimized-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
