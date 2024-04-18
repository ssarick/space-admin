import { computed, onMounted, ref } from 'vue';
import { IListItem } from '@/shared/types/common.types';
import { ApiNotifications } from '@/projects/autopay/shared/api';
import { INotification } from '@/projects/superadmin/shared/types/notifications.types';
import { mapNotificationsToList } from '../utils';

export default function useNotificationsMain() {
  const loading = ref<boolean>(false);
  const notifications = ref<INotification[]>([]);

  const notificationsList = computed<IListItem[]>(
    () => mapNotificationsToList(notifications.value)
  );

  const fetchNotifications = async () => {
    loading.value = true;

    const { items } = await ApiNotifications
      .fetchNotifications();

    notifications.value = items || [];
    loading.value = false;
  };

  onMounted(fetchNotifications);

  return {
    loading,
    notificationsList
  };
}
