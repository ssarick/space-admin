import { computed } from 'vue';
import { AuthPanel } from '@/shared/types/auth.types';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { useAuthStore } from '@/app/store/auth/useAuthStore';

export default function useAuthGuard() {
  const authStore = useAuthStore();
  const authPanelStore = useAuthPanelStore();

  const isAuth = computed<boolean>(
    () => authStore.isAuth
      && AuthPanel.hasOwnProperty(
        authPanelStore.selectedPanel!
      )
  );

  return {
    isAuth
  };
}
