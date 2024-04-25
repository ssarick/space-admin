import { RouteRecordRaw } from 'vue-router';
import terminalRoutes from './terminal';

export default [
  {
    path: 'control-panel',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      ...terminalRoutes
    ]
  }
] as RouteRecordRaw[];
