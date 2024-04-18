import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';
import { ApiInternalNotificationItem } from '@/projects/internal-notification/shared/api';
import { InternalNotificationListControls } from '../internal-notification-list.types';

export default function useNotificationsReadByIds(
  listControls: InternalNotificationListControls
) {
  const {
    decreaseUnreadCount
  } = useInternalNotificationStore();

  const markAsReadById = (id: number) => {
    for (const notification of listControls.notifications.value) {
      if (notification.id === id) {
        notification.isRead = true;

        break;
      }
    }
  };

  const handleReadById = async (id: number) => {
    const { error } = await ApiInternalNotificationItem
      .markAsRead({ ids: [ id ] });

    if (error) return;

    markAsReadById(id);
    decreaseUnreadCount();
  };

  return {
    handleReadById
  };
}
