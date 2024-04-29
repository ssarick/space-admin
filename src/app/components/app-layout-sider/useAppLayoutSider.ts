import { ref, toRefs } from 'vue';
import { useMainRoute } from '@/shared/composables/main-route/useMainRoute';
import { useInternalNotificationStore } from '@/projects/internal-notification/app/store/useInternalNotificationStore';
import useAppMenu from './utils/useAppMenu';
import useSelectedMenuKey from './utils/useSelectedMenuKey';

export default function useAppLayoutSider() {
  const menuCollapsed = ref(false);
  const menuOptions = useAppMenu();
  const { selectedKey } = useSelectedMenuKey(menuOptions);
  const { mainRoute } = useMainRoute();

  const { currentVersion } = toRefs(useInternalNotificationStore());

  const toggleMenuCollapsed = () =>
    menuCollapsed.value = !menuCollapsed.value;

  return {
    selectedKey,
    menuOptions,
    menuCollapsed,
    mainRoute,
    currentVersion,
    toggleMenuCollapsed
  };
}
