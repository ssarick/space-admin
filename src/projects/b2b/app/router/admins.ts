import { RouteRecordRaw } from 'vue-router';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';

export default [
  {
    name: 'admins-wrapper',
    path: 'admins',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Administrators'
      },
      permission: {
        [PermissionTarget.ADMIN]: [
          PermissionAction.READ
        ]
      }
    },
    children: [
      {
        name: 'admins',
        path: '',
        component: () => import('@/projects/b2b/pages/admins/list/AdminsListPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          },
          permission: {
            [PermissionTarget.ADMIN]: [
              PermissionAction.READ
            ]
          },
          mfoChangeable: false
        }
      },
      {
        name: 'admins-create',
        path: 'create',
        component: () => import('@/projects/b2b/pages/admins/create/AdminCreatePage.vue'),
        meta: {
          permission: {
            [PermissionTarget.ADMIN]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        name: 'admins-edit',
        path: ':id',
        component: () => import('@/projects/b2b/pages/admins/edit/AdminEditPage.vue'),
        meta: {
          permission: {
            [PermissionTarget.ADMIN]: [
              PermissionAction.UPDATE
            ]
          },
          mfoChangeable: false
        }
      }
    ]
  }
] as RouteRecordRaw[];
