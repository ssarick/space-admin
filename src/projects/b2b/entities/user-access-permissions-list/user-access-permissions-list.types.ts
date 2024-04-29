import { IUserPermission } from '@/projects/b2b/shared/types/user.types';

export interface IUserAccessPermissionsListProps {
  relatedUserPermissions: IUserPermission[]
  disabled?: boolean
}
