import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/workplace',
  name: 'Workplace',
  component: () => import('@/views/HomePage.vue'),
};

export default DASHBOARD;
