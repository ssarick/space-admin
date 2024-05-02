import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'bins',
    name: 'bins-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'bins-add'
      }
    },
    redirect: {
      name: 'bins-list'
    },
    children: [
      {
        path: '',
        name: 'bins-list',
        component: () => import(
          '@/projects/control-panel/pages/bins/list/BinsListPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: '',
        name: 'bins-create',
        component: () => import(
          '@/projects/control-panel/pages/bins/create/BinsCreatePage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Creation'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
