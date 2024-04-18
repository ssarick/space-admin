import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'all-messages',
    name: 'all-messages',
    component: () => import('@/projects/notification-service/pages/sms/all-messages/AllMessagesPage.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'all-messages'
      }
    }
  }
] as RouteRecordRaw[];
