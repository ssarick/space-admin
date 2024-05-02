import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue';
import { useMainRoute } from '@/shared/composables/main-route/useMainRoute.ts';
import { AuthPanel, ISignInFormModel } from '@/shared/types/auth.types.ts';
import { ILinkListItem } from '@/shared/types/list.types.ts';
import useFormRef from '@/shared/UI/base-form/useFormRef.ts';
import { formValidate } from '@/shared/utils/functions';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore.ts';
import { useAuthStore } from '@/app/store/auth/useAuthStore.ts';

export default function useSignInModule() {
  const authStore = useAuthStore();
  const authPanelStore = useAuthPanelStore();
  const signInLoading = ref(false);
  const signedIn = ref(false);
  const { goToMainRoute } = useMainRoute();

  const submitButtonLoading = computed<boolean>(
    () => authStore.userLoading || signInLoading.value
  );

  const signInFormModel = reactive<
    ISignInFormModel
  >({
    username: '',
    password: '',
    rememberMe: false
  });

  const signInFormRef = useFormRef();

  const signIn = async () => {
    const signInFormHasError = await formValidate(
      signInFormRef.value
    );

    if (!signInFormHasError) {
      signInLoading.value = true;

      const success = await authStore
        .signIn({
          ...signInFormModel
        });

      signedIn.value = success;
      signInLoading.value = false;
    }
  };

  const onSelectAuthPanel = async (
    payload: ILinkListItem<AuthPanel>
  ) => {
    authPanelStore.setPanel(payload.value!);
    goToMainRoute();
    await authStore.loadAuthedUser();
  };

  onMounted(() => {
    authPanelStore.setPanel(null);
  });

  return {
    signInFormModel,
    signInFormRef,
    signedIn,
    submitButtonLoading,
    signIn,
    authPanelStore,
    onSelectAuthPanel
  };
}
