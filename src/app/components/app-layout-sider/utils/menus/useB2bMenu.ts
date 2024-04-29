import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePermissionsStore } from '@/projects/b2b/app/store/permission/usePermissionsStore';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useB2bMenu():
ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();
  const permissionsStore = usePermissionsStore();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('Clients'),
      key: 'clients',
      icon: 'clients',
      visibility: permissionsStore.has(
        PermissionAction.READ,
        PermissionTarget.CLIENT
      )
    },
    {
      label: t('Users'),
      key: 'users',
      icon: 'people',
      visibility: permissionsStore.has(
        PermissionAction.READ,
        PermissionTarget.USER
      )
    },
    {
      label: t('Logs-upload'),
      key: 'logs',
      icon: 'logs-unload',
      visibility: permissionsStore.has(
        PermissionAction.READ,
        PermissionTarget.LOG
      )
    },
    {
      label: t('Administrators'),
      key: 'admins',
      icon: 'admin',
      visibility: permissionsStore.has(
        PermissionAction.READ,
        PermissionTarget.ADMIN
      )
    },
    {
      label: t('oper-day'),
      key: 'oper-day',
      icon: 'settings',
      visibility: permissionsStore.has(
        PermissionAction.READ,
        PermissionTarget.OPER_DAY
      )
    }
  ]);
}
