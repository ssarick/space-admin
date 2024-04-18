import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export interface IAdminStateFormProps {
  adminIsBlocked?: boolean
  data?: IAdmin | null
  loading?: boolean
  stateBlockingReason?: string | null
  stateBlockingReasonId?: number | null
}

export interface IAdminStateFormEmits {
  (
    event: 'update:stateBlockingReason',
    value: IAdminStateFormProps['stateBlockingReason']
  )
  (
    event: 'update:stateBlockingReasonId',
    value: IAdminStateFormProps['stateBlockingReasonId']
  )
  (
    event: 'change-state'
  )
}
