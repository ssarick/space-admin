import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'sessions',
    name: 'inventory-sessions-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'inventory-sessions'
      }
    },
    redirect: {
      name: 'inventory-sessions'
    },
    children: [
      {
        path: '',
        name: 'inventory-sessions',
        component: () => import(
          '@/projects/inventory/pages/sessions/list/SessionsListPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: 'create',
        name: 'inventory-sessions-create',
        component: () => import(
          '@/projects/inventory/pages/sessions/create/SessionCreatePage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Creation'
          }
        }
      },
      {
        path: ':sessionId',
        name: 'inventory-sessions-info',
        component: () => import(
          '@/projects/inventory/pages/sessions/info/SessionInfoPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Info'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
