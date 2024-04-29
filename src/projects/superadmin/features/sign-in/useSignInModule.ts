import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue';
import { useMainRoute } from '@/shared/composables/main-route/useMainRoute';
import { AuthPanel, ISignInFormModel } from '@/shared/types/auth.types';
import { ILinkListItem } from '@/shared/types/list.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { useAuthStore } from '@/app/store/auth/useAuthStore';

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
      // signedIn.value = true;
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
