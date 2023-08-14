
import type { RouteRecordRaw } from 'vue-router';

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');
import { REDIRECT_ROUTE_NAME } from '@/router/constants';


/**
 * @description 路由重定向
 */
export const REDIRECT_MAIN: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
}

/**
 * @description 404 
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/not-found/index.vue'),
};