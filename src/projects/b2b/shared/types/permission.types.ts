import { DeepPartial } from '@/shared/types/utility.types';

export enum AdminRole {
  SUPER_ADMIN = 1,
  ADMIN,
  CALL_CENTER
}

export enum PermissionTarget {
  CLIENT,
  USER,
  LOG,
  ADMIN,
  MFO,
  OPER_DAY
}

export enum PermissionAction {
  CREATE,
  UPDATE,
  READ,
  DELETE,
  UNBLOCK_USER_IF_PASSWORD_ATTEMPTS,
  ANY_ACTIONS
}

export type Permission = Record<
  PermissionTarget, PermissionAction[]
>;

export type PermissionByRole = Record<
  AdminRole, () => DeepPartial<Permission>
>;
