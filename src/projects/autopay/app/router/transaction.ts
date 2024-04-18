import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'transaction',
    name: 'transaction-list-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'transaction-list'
      }
    },
    redirect: {
      name: 'transaction-list'
    },
    children: [
      {
        path: 'list',
        name: 'transaction-list',
        component: () => import(
          '@/projects/autopay/pages/transaction/list/TransactionListPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'by-auto-debit'
          }
        }
      },
      {
        path: 'manual',
        name: 'transaction-manual',
        component: () => import(
          '@/projects/autopay/pages/transaction/manual/TransactionManualPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'on-the-site'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
