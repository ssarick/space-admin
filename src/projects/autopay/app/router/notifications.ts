import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'notifications',
    name: 'notifications',
    component: () => import('@/projects/superadmin/pages/notifications/NotificationsPage.vue')
  }
] as RouteRecordRaw[];
