import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'administration',
    name: 'administration',
    component: () => import('@/projects/autopay/pages/administration/AdministrationPage.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Administration'
      }
    }
  }
] as RouteRecordRaw[];
