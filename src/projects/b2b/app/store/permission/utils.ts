import {
  AdminRole,
  Permission,
  PermissionAction,
  PermissionByRole,
  PermissionTarget
} from '@/projects/b2b/shared/types/permission.types';

export const permissionByRoles: PermissionByRole = {
  [AdminRole.CALL_CENTER]: () => ({
    [PermissionTarget.USER]: [
      PermissionAction.READ,
      PermissionAction.UNBLOCK_USER_IF_PASSWORD_ATTEMPTS
    ],
    [PermissionTarget.MFO]: [
      PermissionAction.READ,
      PermissionAction.UPDATE
    ]
  }),
  [AdminRole.ADMIN]: () => ({
    ...getDefaultPermissions(),
    [PermissionTarget.OPER_DAY]: [
      PermissionAction.READ,
      PermissionAction.UPDATE
    ],
    [PermissionTarget.ADMIN]: [],
    [PermissionTarget.MFO]: [
      PermissionAction.READ
    ]
  }),
  [AdminRole.SUPER_ADMIN]: () => getDefaultPermissions()
};

function getDefaultPermissionActionEntity():
PermissionAction[] {
  return Object
    .keys(PermissionAction)
    .filter(action => !isNaN(+action))
    .map(action => +action);
}

function getDefaultPermissions(): Permission {
  const permissions = {
  } as Permission;

  for (const key in PermissionTarget) {
    if (!isNaN(+key)) {
      permissions[key] =
        getDefaultPermissionActionEntity();
    }
  }

  return permissions;
}
