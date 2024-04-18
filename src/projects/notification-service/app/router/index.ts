import { RouteRecordRaw } from 'vue-router';
import smsRoutes from './sms';

export default [
  {
    path: 'notification-service',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...smsRoutes
    ]
  }
] as RouteRecordRaw[];
