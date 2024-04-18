import { RouteRecordRaw } from 'vue-router';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';

export default [
  {
    path: 'oper-day',
    name: 'oper-day',
    component: () => import('@/projects/b2b/pages/oper-day/OperDayPage.vue'),
    meta: {
      permission: {
        [PermissionTarget.OPER_DAY]: [
          PermissionAction.READ
        ]
      }
    }
  }
] as RouteRecordRaw[];
