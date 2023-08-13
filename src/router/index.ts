import { createRouter, createWebHistory } from 'vue-router'

/**
 * @description
 * @param history|使用 History API 可以生成较为优雅的 URL，去除了传统的哈希（hash）模式中的 # 符号。
 * @param router
 */
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: () => import('@/views/login/index.vue'),
      component: () => import('@/views/HomePage.vue')
    }
  ]
})

export default router
