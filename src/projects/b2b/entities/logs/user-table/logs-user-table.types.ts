import { IUser } from '@/projects/b2b/shared/types/user.types';

export interface ILogsUserTableProps {
  data?: IUser[]
  loading?: boolean
  selected?: IUser | null
}

export interface ILogsUserTableEmits {
  (
    event: 'update:selected',
    value: ILogsUserTableProps['selected']
  )
}
