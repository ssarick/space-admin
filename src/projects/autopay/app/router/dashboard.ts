import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '',
    component: () => import(
      '@/app/layouts/RouterViewLayout.vue'
    ),
    meta: {
      breadcrumbsConfig: {
        locale: 'dashboard'
      }
    },
    redirect: {
      name: 'dashboard-manual'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import(
          '@/projects/autopay/pages/dashboard/DashboardPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'by-auto-debit'
          }
        }
      },
      {
        path: 'manual',
        name: 'dashboard-manual',
        component: () => import(
          '@/projects/autopay/pages/dashboard-manual/DashboardManualPage.vue'
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
