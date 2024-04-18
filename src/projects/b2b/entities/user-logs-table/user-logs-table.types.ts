import { IUserLog } from '@/projects/b2b/shared/types/user.types';

export interface IUserLogsTableProps {
  logs: IUserLog[]
  loading?: boolean
}
