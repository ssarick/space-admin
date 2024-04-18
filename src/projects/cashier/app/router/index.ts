import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'cashier',
    name: 'cashier',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        exclude: true
      }
    },
    children: [
      {
        path: 'cashier-operations',
        name: 'cashier-operations',
        component: () => import('@/projects/cashier/pages/cashier-operation/CashierOperation.vue')
      },
      {
        path: 'five-one',
        name: 'five-one',
        component: () => import('@/projects/cashier/pages/five-one-operation/FiveOneOperation.vue')
      },
      {
        path: 'five-three',
        name: 'five-three',
        component: () => import('@/projects/cashier/pages/five-three-operation/FiveThreeOperation.vue')
      }
    ]
  }
] as RouteRecordRaw[];
