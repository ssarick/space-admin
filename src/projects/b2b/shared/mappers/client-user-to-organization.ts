import { IClientUser, IUserOrganization } from '@/projects/b2b/shared/types/user.types';

export const mapClientUserToOrganization = (
  clientUser: IClientUser
): IUserOrganization => ({
  clientName: clientUser.clientName || '',
  inn: clientUser.inn || '',
  clientCode: clientUser.clientCode || '',
  stateId: clientUser.stateId || null,
  userRole: clientUser.roleName || '',
  userRoleId: clientUser.roleId || -1
});
