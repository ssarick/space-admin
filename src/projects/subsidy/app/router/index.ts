import { RouteRecordRaw } from 'vue-router';
import applicationsRoutes from './applications';

export default [
  {
    path: 'subsidy',
    name: 'subsidy',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: applicationsRoutes
  }
] as RouteRecordRaw[];
