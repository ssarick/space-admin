import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'terminals',
    name: 'terminals-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'terminals-add'
      }
    },
    redirect: {
      name: 'terminals-list'
    },
    children: [
      {
        path: '',
        name: 'terminals-list',
        component: () => import(
          '@/projects/control-panel/pages/terminals/list/TerminalsListPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: '',
        name: 'terminals-create',
        component: () => import(
          '@/projects/control-panel/pages/terminals/create/TerminalCreatePage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Creation'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
