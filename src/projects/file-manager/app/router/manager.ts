import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: ':bucket?',
    name: 'file-manager',
    component: () => import('../../pages/files-manage/FilesManagePage.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    }
  }
] as RouteRecordRaw[];
