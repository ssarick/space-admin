import { RouteRecordRaw } from 'vue-router';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';

export default [
  {
    path: 'users',
    name: 'users-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Users'
      },
      permission: {
        [PermissionTarget.USER]: [
          PermissionAction.READ
        ]
      }
    },
    redirect: { name: 'users' },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('@/projects/b2b/pages/users/UsersPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          },
          permission: {
            [PermissionTarget.USER]: [
              PermissionAction.READ
            ]
          }
        }
      },
      {
        path: ':userId/tabs/:tabName?',
        name: 'user-data-tabs',
        component: () =>
          import('@/projects/b2b/pages/users/user-data-tabs/UserDataTabsPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'User-data'
          },
          permission: {
            [PermissionTarget.USER]: [
              PermissionAction.READ
            ]
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
