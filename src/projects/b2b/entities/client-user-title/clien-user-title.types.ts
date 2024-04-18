import { IClientUser } from '@/projects/b2b/shared/types/user.types';

export interface IClientUserTitleProps {
  clientUserLoading?: boolean
  clientUser?: IClientUser | null
}
