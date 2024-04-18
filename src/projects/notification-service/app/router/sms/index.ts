import { RouteRecordRaw } from 'vue-router';
import allMessagesRoutes from './all-messages';
import groupMessagesRoutes from './group-messages';
import messageTemplates from './message-templates';
import sendRoutes from './send-message';

export default [
  {
    path: 'sms',
    name: 'sms',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'sms'
      }
    },
    children: [
      ...allMessagesRoutes,
      ...groupMessagesRoutes,
      ...sendRoutes,
      ...messageTemplates
    ]
  }
] as RouteRecordRaw[];
