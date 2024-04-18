import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'b2c',
    name: 'b2c',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      // Your routes
    ]
  }
] as RouteRecordRaw[];
