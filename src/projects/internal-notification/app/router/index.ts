import { RouteRecordRaw } from 'vue-router';
import creationRoutes from './creation';
import listRoutes from './list';

export default [
  {
    path: 'notifications',
    name: 'notification-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'notifications'
      }
    },
    redirect: { name: 'notification' },
    children: [
      ...creationRoutes,
      ...listRoutes
    ]
  }
] as RouteRecordRaw[];
