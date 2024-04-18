import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'iseeu',
    name: 'iseeu',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      {
        path: 'entity',
        name: 'entity',
        component: () => import('@/projects/iseeu/pages/entity/EntityPage.vue')
      },
      {
        path: 'individual',
        name: 'individual',
        component: () => import('@/projects/iseeu/pages/individual/IndividualPage.vue')
      }
    ]
  }
] as RouteRecordRaw[];
