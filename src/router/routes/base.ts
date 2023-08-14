
import type { RouteRecordRaw } from 'vue-router';

/**
 * @description 路由重定向
 */
export const REDIRECT_MAIN: RouteRecordRaw = {}

/**
 * @description 404 
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  // component: () => import('@/views/not-found/index.vue'),
};