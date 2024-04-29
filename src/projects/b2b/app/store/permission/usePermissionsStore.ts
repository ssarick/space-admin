import { ref } from 'vue';
import { defineStore } from 'pinia';
import { DeepPartial } from '@/shared/types/utility.types';
import {
  AdminRole,
  Permission,
  PermissionAction,
  PermissionTarget
} from '@/projects/b2b/shared/types/permission.types';
import { permissionByRoles } from './utils';

export const usePermissionsStore = defineStore(
  'b2b-permissions',
  () => {
    const permissions = ref<DeepPartial<Permission>>({
    });

    const has = (
      actions: PermissionAction
        | PermissionAction[],
      target: PermissionTarget
    ): boolean => !!(Array.isArray(actions)
      ? actions.every(action =>
        permissions.value[target]?.includes(action))
      : permissions.value[target]?.includes(actions)) || true; // TODO mock

    const hasMulti = (
      permission: Partial<Permission>
    ): boolean => {
      return true; // TODO mock

      for (const key in permission) {
        if (!has(permission[key], +key))
          return false;
      }

      return true;
    };

    const setPermissions = (
      newRole: AdminRole = AdminRole.CALL_CENTER
    ) => permissions.value = permissionByRoles[newRole]();

    return {
      permissions,
      has,
      hasMulti,
      setPermissions
    };
  }
);
