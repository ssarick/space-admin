import { defineStore } from 'pinia';
import { ApiInternalNotificationItem } from '../../shared/api';
import { InternalNotification } from '../../shared/types/internal-notification.types';

export const useInternalNotificationStore = defineStore(
  'internal-notification',
  () => {
    const unreadCountLoading = ref(false);
    const unreadCount = ref<number>(0);
    const currentVersion = ref<string>('');

    const lastVersionNotification = ref<
      InternalNotification | null
    >(null);

    const fetchUnreadCount = async () => {
      unreadCountLoading.value = true;

      const { item } = await ApiInternalNotificationItem
        .getUnreadCount();

      unreadCountLoading.value = false;
      unreadCount.value = item?.count || 0;
    };

    const fetchLastVersionNotification = async () => {
      const { item } = await ApiInternalNotificationItem
        .getLastVersion();

      if (!item?.id) return;

      lastVersionNotification.value = item;
    };

    const markAsReadLastVersionNotification = async () => {
      const id = lastVersionNotification.value?.id;

      if (!id) return;

      lastVersionNotification.value!.isRead = true;

      await ApiInternalNotificationItem
        .markAsRead({
          ids: [ id ]
        });
    };

    const fetchCurrentVersion = async () => {
      const { item } = await ApiInternalNotificationItem
        .getPublicLastVersion();

      currentVersion.value = item?.version || '1.0.0';
    };

    const resetUnreadCount = () => unreadCount.value = 0;
    const decreaseUnreadCount = () => unreadCount.value--;

    return {
      unreadCount,
      currentVersion,
      fetchCurrentVersion,
      resetUnreadCount,
      lastVersionNotification,
      fetchUnreadCount,
      fetchLastVersionNotification,
      markAsReadLastVersionNotification,
      decreaseUnreadCount
    };
  }
);
