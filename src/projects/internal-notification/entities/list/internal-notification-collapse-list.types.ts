import { InternalNotification } from '../../shared/types/internal-notification.types';

export interface InternalNotificationCollapseListProps {
  list?: InternalNotification[]
}

export interface InternalNotificationCollapseListEmits {
  (event: 'fetch')
  (event: 'read', value: number)
}
