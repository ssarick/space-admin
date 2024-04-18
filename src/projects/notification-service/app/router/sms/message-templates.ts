import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '',
    name: 'message-templates-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'message-templates'
      }
    },
    redirect: {
      name: 'message-templates'
    },
    children: [
      {
        path: 'message-templates',
        name: 'message-templates',
        component: () => import('@/projects/notification-service/pages/sms/message-templates/list/MessageTemplatesListPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: 'message-templates-create',
        name: 'message-templates-create',
        component: () => import('@/projects/notification-service/pages/sms/message-templates/create/CreateMessageTemplatePage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'message-templates-create'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
