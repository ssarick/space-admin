import { IPagination } from '@/shared/types/pagination.types';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import { IClient } from './client.types';

export enum UserStateId {
  BLOCKED,
  ACTIVE,
}

export enum UserBlockingReason {
  PASSWORD_ATTEMPTS = 11,
  CONFIRM_ATTEMPTS = 21
}

export enum ClientUserDataTabName {
  PERSONAL_DATA = 'personal-data',
  PERMISSIONS = 'permissions',
  ACCESS_ACCOUNTS = 'access-accounts',
  CERTIFICATES = 'certificates',
  LOGS = 'logs',
}

export interface IUserByIdQueryParams {
  isNewClient?: string;
}

export interface IUserQueryParams extends IPagination {
  userLogin?: string | null;
  userName?: string | null;
  userPhone?: string | null;
  userPidSN?: string | null;
  userPidNumber?: string | null;
  excludeBranch?: string;
  excludeBusinessCode?: string;
}

export interface IUserSearchModel extends Pick<
  IUserQueryParams, 'userLogin'
    | 'userName'
    | 'userPhone'
    | 'userPidSN'
    | 'userPidNumber'
> {}

export interface IUser {
  fio: string | null;
  pidTypeId: number | null;
  pidTypeName?: string | null;
  pidSn: string | null;
  pidNum: string | null;
  phone: string | null;
  email: string | null;
  phrase: string | null;
  login: string | null;
  userId?: string | number | null;
  role?: string;
  createDate?: string;
  stateId?: number;
  pwdExpired?: string;
  pwdLastTryDate?: string;
  pwdWrongTries?: string;
  stateReason?: UserStateId | null;
  stateReasonId?: number | null;
  fillDate?: string | null;
}

export interface IUserRole {
  id: number;
  name: string;
  modules?: IUserPermission[];
}

export interface IUserAction {
  id: number;
  name: string;
  key: string;
}

export interface IUserPermission {
  id: number;
  name: string;
  key: string;
  actions: IUserAction[];
}

export interface IUserOrganization {
  clientName: string | null;
  inn: string | null;
  clientCode: string | null;
  stateId: UserStateId | null;
  userRole: string | null;
  userRoleId: number | null;
}

export interface IUserOrganizationFetchingParams
  extends IPagination,
    NonNullableObjectValues<Pick<IUser, 'userId'>> {
  branch: string;
}

export interface IUserResetPasswordParams
  extends NonNullableObjectValues<Pick<IUser, 'userId'>> {}

export interface IUserEditableData
  extends Partial<
    Pick<
      IUser,
      | 'fio'
      | 'pidTypeId'
      | 'pidSn'
      | 'pidNum'
      | 'phone'
      | 'email'
      | 'phrase'
      | 'login'
    >
  > {}

export interface IClientUser extends
  IUser,
  Partial<Omit<IClient, keyof IUser>> {
  clientStateId?: number | null
  userStateId?: number | null
  roleName?: string | null
  roleId?: number | null
}

export interface IUserRelations {
  role: IUserRole;
  modules: IUserPermission[]
}

export interface IUserLogsFetchingParams extends
  IPagination {
  userId: number
}

export interface IUserLog {
  controller: string | null
  controllerAction: string | null
  dateTime: string | null
  adminLogin: string | null
  changeCommandData: string | null
  userId: number | null
}
