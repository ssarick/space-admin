import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { IListItem } from '@/shared/types/common.types';
import { ApiNotifications } from '@/projects/autopay/shared/api';
import { INotificationError } from '@/projects/superadmin/shared/types/notifications.types';
import { mapNotificationsToList } from '../utils';

export default function useNotificationsErrors() {
  const loading = ref(false);
  const notifications = ref<INotificationError[]>([]);
  const checkedNotificationIds = ref<number[]>([]);
  const loadingSubmit = ref(false);
  const message = useMessage();
  const { t } = useI18n();

  const notificationsList = computed<IListItem[]>(
    () => mapNotificationsToList(notifications.value)
  );

  const fetchNotifications = async () => {
    loading.value = true;

    const { items } = await ApiNotifications
      .fetchNotificationErrors();

    notifications.value = items || [];
    loading.value = false;
  };

  const onSubmitCheckedNotifications = async () => {
    loadingSubmit.value = true;

    const { error } = await ApiNotifications
      .sendNotificationErrorsToAdmin(
        checkedNotificationIds.value
      );

    error || message.success(t('Success'));

    loadingSubmit.value = false;
  };

  onMounted(fetchNotifications);

  return {
    loading,
    loadingSubmit,
    notificationsList,
    checkedNotificationIds,
    onSubmitCheckedNotifications
  };
}
