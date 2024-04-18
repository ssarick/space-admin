import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'list',
    name: 'binded-face-list',
    component: () => import('@/projects/binded-face/pages/binded-face/list/BindedFaceListPage.vue')
  }
] as RouteRecordRaw[];
