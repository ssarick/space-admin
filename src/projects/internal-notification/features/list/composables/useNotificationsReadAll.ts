import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';
import { ApiInternalNotificationItem } from '@/projects/internal-notification/shared/api';
import { InternalNotificationListControls } from '../internal-notification-list.types';

export default function useNotificationsReadAll(
  listControls: InternalNotificationListControls
) {
  const { resetUnreadCount } = useInternalNotificationStore();

  const readAllLoading = ref(false);

  const markAllAsRead = () => listControls
    .notifications
    .value
    .forEach(notification => notification.isRead = true);

  const handleReadAll = async () => {
    readAllLoading.value = true;

    const { error } = await ApiInternalNotificationItem
      .markAsReadAllByService();

    readAllLoading.value = false;

    if (error) return;

    markAllAsRead();
    resetUnreadCount();
  };

  return {
    handleReadAll,
    readAllLoading
  };
}
