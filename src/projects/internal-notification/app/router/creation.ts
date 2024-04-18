import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'create',
    name: 'notification-create',
    component: () => import(
      '../../pages/create/InternalNotificationCreatePage.vue'
    ),
    meta: {
      breadcrumbsConfig: {
        locale: 'Creation'
      }
    }
  }
] as RouteRecordRaw[];
