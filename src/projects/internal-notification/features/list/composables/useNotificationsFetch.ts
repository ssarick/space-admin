import { computed, toRefs } from 'vue';
import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';
import { ApiInternalNotificationItem } from '@/projects/internal-notification/shared/api';
import { InternalNotification } from '@/projects/internal-notification/shared/types/internal-notification.types';

export default function useNotificationsFetch() {
  const notificationsLoading = ref(false);
  const notifications = ref<InternalNotification[]>([]);
  const totalCount = ref<number>(0);
  const pageNumber = ref<number>(0);
  const pageSize = 25;

  const {
    lastVersionNotification
  } = toRefs(useInternalNotificationStore());

  const isPlaceholderVisible = computed<boolean>(
    () => !notifications.value.length
      && !notificationsLoading.value
  );

  const checkCanFetch = (): boolean => !((totalCount.value
    && notifications.value.length >= totalCount.value)
    || notificationsLoading.value);

  const fetchNotifications = async () => {
    if (!checkCanFetch()) return;

    notificationsLoading.value = true;
    pageNumber.value++;

    const {
      items,
      totalCount: totalItems
    } = await ApiInternalNotificationItem
      .fetchList({
        pageNumber: pageNumber.value,
        pageSize
      });

    notificationsLoading.value = false;
    totalCount.value = totalItems || totalCount.value;
    notifications.value.push(...items);
  };

  const handleLastNotification = () => {
    const id = lastVersionNotification.value?.id;
    const [ notification ] = notifications.value;

    if (!id) return;

    if (notification?.id === id) {
      notification.isRead = true;
    } else {
      notifications.value.unshift(
        lastVersionNotification.value!
      );
    }
  };

  watch(
    () => lastVersionNotification.value?.id,
    handleLastNotification
  );

  onMounted(fetchNotifications);

  return {
    isPlaceholderVisible,
    notificationsLoading,
    notifications,
    fetchNotifications
  };
}
