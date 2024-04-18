import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'contract/list',
    name: 'contract-list-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    redirect: {
      name: 'contract-list'
    },
    children: [
      {
        path: '',
        name: 'contract-list',
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        },
        component: () => import('@/projects/autopay/pages/contract/list/ContractListPage.vue')
      },
      {
        path: 'detail/:id',
        name: 'contract-detail',
        component: () => import('@/projects/autopay/pages/contract/detail/ContractDetailPage.vue')
      },
      {
        path: 'contragent/:id',
        name: 'contragent-detail',
        component: () => import('@/projects/autopay/pages/contract/contragent/ContragentDetailPage.vue')
      }
    ]
  }
] as RouteRecordRaw[];
