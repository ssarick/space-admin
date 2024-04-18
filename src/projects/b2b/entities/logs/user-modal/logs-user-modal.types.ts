import { IUser } from '@/projects/b2b/shared/types/user.types';

export interface ILogsUserModalProps {
  modelValue?: boolean
  uploadLoading?: boolean
  usersLoading?: boolean
  users?: IUser[] | null
}

export interface ILogsUserModalEmits {
  (
    event: 'update:modelValue',
    value: ILogsUserModalProps['modelValue']
  )
  (
    event: 'upload',
    value: IUser['userId'][]
  )
  (
    event: 'fetch-users'
  )
}
