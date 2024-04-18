import { RouteRecordRaw } from 'vue-router';
import listRoutes from './list';

export default [
  {
    path: 'logs-audit',
    name: 'logs-audit',
    component: () => import(
      '@/app/layouts/RouterViewLayout.vue'
    ),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: listRoutes
  }
] as RouteRecordRaw[];
