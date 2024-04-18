import { RouteRecordRaw } from 'vue-router';
import sessionsRoutes from './sessions';
import usersRoutes from './users';

export default [
  {
    path: 'inventory',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...usersRoutes,
      ...sessionsRoutes
    ]
  }
] as RouteRecordRaw[];
