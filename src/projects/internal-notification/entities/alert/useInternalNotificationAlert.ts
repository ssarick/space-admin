import { ref } from 'vue';
import { useInternalNotificationStore } from '../../app/store/useInternalNotificationStore';

export default function useInternalNotificationAlert() {
  const {
    lastVersionNotification,
    markAsReadLastVersionNotification,
    currentVersion
  } = toRefs(useInternalNotificationStore());

  const isAlertVisible = ref(false);

  const handleClose = () => isAlertVisible.value = false;

  const handleUpdate = () => location.reload();

  const checkLastNotificationVisibility = (): boolean => !!(
    currentVersion.value
      && lastVersionNotification.value?.version
      && currentVersion.value !==
        lastVersionNotification.value.version
      && !lastVersionNotification.value?.isRead
  );

  const handleLastNotification = async () => {
    if (!checkLastNotificationVisibility()) return;

    isAlertVisible.value = true;

    await markAsReadLastVersionNotification.value();
  };

  watch(
    () => [
      lastVersionNotification.value?.id,
      currentVersion.value
    ],
    handleLastNotification
  );

  return {
    isAlertVisible,
    lastVersionNotification,
    handleClose,
    handleUpdate
  };
}
