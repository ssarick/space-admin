import { IUser } from '@/projects/b2b/shared/types/user.types';

export interface IUserInfoCardProps {
  data: IUser | null;
  isEdit?: boolean;
}
