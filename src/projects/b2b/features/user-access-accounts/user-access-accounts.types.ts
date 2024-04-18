import { IClientUser } from '@/projects/b2b/shared/types/user.types';

export interface IUserAccessAccountsProps {
  clientUser?: IClientUser | null
  clientUserLoading?: boolean
  isEdit?: boolean
  businessCode?: string
}
