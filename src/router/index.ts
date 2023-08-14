import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';

/**
 * @description
 * @param NProgress|进度条
 * @param history|使用 History API 可以生成较为优雅的 URL，去除了传统的哈希（hash）模式中的 # 符号。
 * @param router
 * @param scrollBehavior|登录页默认滚动置顶
 */
NProgress.configure({ showSpinner: false });
import { appRoutes } from './routes';

console.log('appRoutes:', appRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
