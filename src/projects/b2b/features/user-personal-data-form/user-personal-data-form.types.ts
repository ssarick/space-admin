import { IResponseData } from '@/shared/types/api.types';
import { IUser } from '@/projects/b2b/shared/types/user.types';

export interface IUserPersonalDataFormProps {
  userData: IUser | null
  businessCode?: string
  isEdit?: boolean
  loadUserData: () => Promise<
    IResponseData<IUser> | undefined
  >
}
