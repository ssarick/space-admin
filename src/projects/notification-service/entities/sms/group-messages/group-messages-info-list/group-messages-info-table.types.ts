import type {
  GroupMessagesClient
} from '@/projects/notification-service/shared/types/group-messages.types';

export interface GroupMessagesInfoTableProps {
  data?: GroupMessagesClient[]
  loading?: boolean
}
