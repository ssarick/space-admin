import { RouteRecordRaw } from 'vue-router';
import managerRoutes from './manager';

export default [
  {
    path: 'file-manager',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...managerRoutes
    ]
  }
] as RouteRecordRaw[];
