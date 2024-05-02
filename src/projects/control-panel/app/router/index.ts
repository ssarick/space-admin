import { RouteRecordRaw } from 'vue-router';
import binsRoutes from './bins';
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
      ...terminalRoutes,
      ...binsRoutes
    ]
  }
] as RouteRecordRaw[];
