import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '',
    name: 'grouped-messages-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'grouped-messages'
      }
    },
    redirect: {
      name: 'grouped-messages'
    },
    children: [
      {
        path: 'grouped-messages',
        name: 'grouped-messages',
        component: () => import('@/projects/notification-service/pages/sms/group-messages/list/GroupMessagesPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: ':messageId',
        name: 'grouped-message-info',
        component: () => import('@/projects/notification-service/pages/sms/group-messages/info/GroupedMessagesInfoPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Info'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
