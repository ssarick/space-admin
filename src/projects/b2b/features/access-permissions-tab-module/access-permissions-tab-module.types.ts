import { IClientUser } from '@/projects/b2b/shared/types/user.types';

export interface IAccessPersmissionsTabModuleProps {
  clientUser?: IClientUser | null
  clientUserLoading?: boolean
  businessCode?: string
  isEdit?: boolean
}
