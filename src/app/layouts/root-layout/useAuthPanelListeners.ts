import { onMounted } from 'vue';
import { globalConfig } from '@/shared/config/global-config';
import { AuthPanel, AuthPanelEvent } from '@/shared/types/auth.types';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useFileManagerBucketsStore } from '@/projects/file-manager/app/store/useFileManagerBucketsStore';
import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';

export default function useAuthPanelListeners() {
  const authStore = useAuthStore();
  const authPanelStore = useAuthPanelStore();
  let lastVersionIntervalId: number;

  const {
    addListener,
    clearAllListeners
  } = useAuthPanelStore();

  const { fetchBuckets: fetchFileManagerBuckets } = useFileManagerBucketsStore();

  const {
    fetchUnreadCount: fetchUnreadNotificationsCount,
    fetchLastVersionNotification,
    fetchCurrentVersion
  } = useInternalNotificationStore();

  const checkIsAdmin = (): boolean => !!(authStore.isAuth
    && authStore.profile?.preferred_username
    && authPanelStore.selectedPanel);

  onMounted(() => {
    fetchCurrentVersion();

    addListener(
      [ AuthPanelEvent.CHANGE, AuthPanelEvent.LOAD ],
      fetchFileManagerBuckets,
      AuthPanel.FILE_MANAGER
    );

    addListener(
      [ AuthPanelEvent.CHANGE, AuthPanelEvent.LOAD ],
      fetchUnreadNotificationsCount
    );

    lastVersionIntervalId = setInterval(
      () => checkIsAdmin() && fetchLastVersionNotification(),
      globalConfig.internalNotification.pollingDelayInSec *
        dateShortcuts.MS_IN_SEC
    );
  });

  onBeforeUnmount(() => {
    clearAllListeners();
    clearInterval(lastVersionIntervalId);
  });
}
