import type { GroupMessagesClientInternal, MessagesStatusGroupMap } from '@/projects/notification-service/shared/types/group-messages.types';

export interface GroupMessagesMainTableProps {
  data?: GroupMessagesClientInternal[]
  loading?: boolean
}

export interface GroupMessagesMainTableEmits {
  (
    event: 'play',
    value: GroupMessagesClientInternal
  )
  (
    event: 'pause',
    value: GroupMessagesClientInternal
  )
  (
    event: 'stop',
    value: GroupMessagesClientInternal
  )
}

export interface MessagesProgress {
  color: string
}

export type MessagesProgressMap = Record<
  keyof MessagesStatusGroupMap, MessagesProgress
>
