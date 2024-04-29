import { RouteRecordRaw } from 'vue-router';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';

export default [
  {
    path: 'logs',
    name: 'logs-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Logs-upload'
      },
      permission: {
        [PermissionTarget.LOG]: [
          PermissionAction.READ
        ]
      }
    },
    redirect: {
      name: 'logs'
    },
    children: [
      {
        path: 'list',
        name: 'logs',
        component: () => import('@/projects/b2b/pages/logs/LogsPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          },
          permission: {
            [PermissionTarget.LOG]: [
              PermissionAction.READ
            ]
          }
        }
      },
      {
        path: 'history',
        name: 'logs-history',
        component: () => import('@/projects/b2b/pages/logs-history/LogsHistoryPage.vue'),
        meta: {
          permission: {
            [PermissionTarget.LOG]: [
              PermissionAction.READ
            ]
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
