import { computed } from 'vue';
import { RouteLocationNamedRaw, useRouter } from 'vue-router';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { mainRouteNames } from './main-routes';

export const useMainRoute = () => {
  const authPanelStore = useAuthPanelStore();
  const router = useRouter();

  const mainRoute = computed<
    string | RouteLocationNamedRaw
  >(
    () => {
      const mainRouteName = mainRouteNames[
        authPanelStore.selectedPanel!
      ];

      return mainRouteName
        ? { name: mainRouteName }
        : '/';
    }
  );

  const goToMainRoute = () => {
    router.push(mainRoute.value);
  };

  return {
    mainRoute,
    goToMainRoute
  };
};
