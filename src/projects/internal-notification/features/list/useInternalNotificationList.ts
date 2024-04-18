import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import useNotificationsFetch from './composables/useNotificationsFetch';
import useNotificationsReadAll from './composables/useNotificationsReadAll';
import useNotificationsReadByIds from './composables/useNotificationsReadByIds';

export default function useInternalNotificationList() {
  const { selectedPanel } = useAuthPanelStore();
  const listControls = useNotificationsFetch();
  const readAllControls = useNotificationsReadAll(listControls);
  const readByIdsControls = useNotificationsReadByIds(listControls);

  return {
    ...listControls,
    ...readAllControls,
    ...readByIdsControls,
    selectedPanel
  };
}
