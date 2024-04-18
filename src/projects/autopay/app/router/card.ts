import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'card/untrusted/list',
    name: 'card-untrusted-list-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    redirect: {
      name: 'card-untrusted-list'
    },
    children: [
      {
        path: '',
        name: 'card-untrusted-list',
        component: () => import(
          '@/projects/autopay/pages/card/untrusted/CardUntrustedListPage.vue'
        )
      },
      {
        path: 'humo',
        name: 'card-untrusted-list-humo',
        component: () => import(
          '@/projects/autopay/pages/card/untrusted-humo/CardHumoUntrustedListPage.vue'
        )
      }
    ]
  }
] as RouteRecordRaw[];
