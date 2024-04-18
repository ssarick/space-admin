import { RouteRecordRaw } from 'vue-router';
import administrationRoutes from './administration';
import cardRoutes from './card';
import contractRoutes from './contract';
import dashboardRoutes from './dashboard';
import notificationsRoutes from './notifications';
import profileRoutes from './profile';
import transactionRoutes from './transaction';

export default [
  {
    path: 'autopay',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...dashboardRoutes,
      ...cardRoutes,
      ...transactionRoutes,
      ...contractRoutes,
      ...administrationRoutes,
      ...notificationsRoutes,
      ...profileRoutes
    ]
  }
] as RouteRecordRaw[];
