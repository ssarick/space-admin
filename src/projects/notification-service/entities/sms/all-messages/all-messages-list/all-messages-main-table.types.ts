import type {
  AllMessagesClient
} from '@/projects/notification-service/shared/types/all-messages.types';

export interface AllMessagesMainTableProps {
  data?: AllMessagesClient[]
  loading?: boolean
}
