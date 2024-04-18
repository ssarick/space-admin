import { toRefs } from 'vue';
import { useMessage } from 'naive-ui';
import { toast } from '@/shared/utils/toast';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import useAuthPanelListeners from './useAuthPanelListeners';

export default function useRootLayout() {
  const {
    exitWarningModal,
    setExitWarningModal
  } = toRefs(useAuthStore());

  toast.value = useMessage();

  const closeExitWarningModal = () =>
    setExitWarningModal.value(false);

  useAuthPanelListeners();

  return {
    exitWarningModal,
    setExitWarningModal,
    closeExitWarningModal
  };
}
