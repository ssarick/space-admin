import { RouteRecordRaw } from 'vue-router';
import bindedFaceRoutes from './binded-face';

export default [
  {
    path: 'binded-face',
    name: 'binded-face',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: bindedFaceRoutes
  }
] as RouteRecordRaw[];
