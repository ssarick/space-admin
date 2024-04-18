import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '',
    name: 'notification',
    component: () => import(
      '../../pages/list/InternalNotificationListPage.vue'
    ),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    }
  }
] as RouteRecordRaw[];
