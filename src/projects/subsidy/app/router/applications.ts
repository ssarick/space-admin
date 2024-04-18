import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'applications',
    name: 'subsidy-applications-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    redirect: {
      name: 'subsidy-applications'
    },
    children: [
      {
        path: '',
        name: 'subsidy-applications',
        component: () => import(
          '@/projects/subsidy/pages/application/list/ApplicationsPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: ':subsidyId',
        name: 'subsidy-applications-info',
        component: () => import(
          '@/projects/subsidy/pages/application/info/ApplicationInfoPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Info'
          }
        }
      },
      {
        path: ':subsidyId/edit',
        name: 'subsidy-applications-edit',
        component: () => import(
          '@/projects/subsidy/pages/application/edit/ApplicationEditPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Editing'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
