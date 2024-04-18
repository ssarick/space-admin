import { RouteRecordRaw } from 'vue-router';
import adminRoutes from './admins';
import clientRoutes from './clients';
import logsRoutes from './logs';
import operDayRoutes from './oper-day';
import userRoutes from './users';

export default [
  {
    path: 'b2b',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...clientRoutes,
      ...userRoutes,
      ...logsRoutes,
      ...adminRoutes,
      ...operDayRoutes
    ]
  }
] as RouteRecordRaw[];
