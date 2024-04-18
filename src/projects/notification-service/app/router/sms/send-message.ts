import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'send-message',
    name: 'send-message',
    component: () => import('@/projects/notification-service/pages/sms/send-message/SendMessagesPage.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'send-message'
      }
    }
  }
] as RouteRecordRaw[];
