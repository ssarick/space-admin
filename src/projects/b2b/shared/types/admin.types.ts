import { IPagination } from '@/shared/types/pagination.types';
import { AdminRole } from './permission.types';
import { UserStateId } from './user.types';

export interface IAdminRoleAction {
  id: number
  roleId: number
  actionId: number
  action: string
  role: string
}

export interface IAdminModule {
  id: number
  name: string
  stateId: UserStateId
  keyName: string
  actions: string[]
  state: string
}

export interface IAdminSession {}

export interface IAdmin {
  id?: number | null
  stateId?: UserStateId | null
  fio?: string | null
  createDate?: string | null
  phone?: string | null
  login?: string | null
  branch?: string | null
  email?: string | null
  userRoleId?: number | null
  userRoleName?: string | null
  stateBlockingReason?: string | null
  stateBlockingReasonId?: number | null
}

export interface IAdminCreationPayload {
  branch: string
  fio: string
  login: string
  phone: string
  email: string
  roleId: AdminRole | null
}

export interface IAdminCreationResponse extends
  Pick<IAdmin, 'id'> {}

export interface IAdminUpdateStatePayload {
  adminId: number
  stateId: number
  adminBlockingReasonId: number
}

export interface IAdminCreationFormModel extends
  IAdminCreationPayload {}

export interface IAdminUpdatePayload extends
  IAdminCreationPayload {
  id: number
}

export interface IAdminSearchModel {
  Fio?: string
  Phone?: string
  Login?: string
  RoleId?: AdminRole
}

export interface IAdminSearchPayload extends
  IAdminSearchModel,
  IPagination {}
