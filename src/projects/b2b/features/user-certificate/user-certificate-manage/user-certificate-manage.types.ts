import { IClientUser } from '@/projects/b2b/shared/types/user.types';

export interface IUserCertificateManageProps {
  clientUserLoading?: boolean
  clientUser?: IClientUser | null
  businessCode?: string
  isEdit?: boolean
}
