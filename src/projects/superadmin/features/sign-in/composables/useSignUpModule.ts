import {
  computed,
  reactive,
  ref
} from 'vue';
import { ISignInFormModel } from '@/shared/types/auth.types.ts';
import useFormRef from '@/shared/UI/base-form/useFormRef.ts';
import { formValidate } from '@/shared/utils/functions';
import { useAuthStore } from '@/app/store/auth/useAuthStore.ts';

export default function useSignUpModule() {
  const authStore = useAuthStore();
  const signUpLoading = ref(false);
  const signedUp = ref(false);

  const submitButtonRegisterLoading = computed<boolean>(
    () => authStore.userLoading || signUpLoading.value
  );

  const signUpFormModel = reactive<
    ISignInFormModel
  >({
    username: '',
    password: '',
    rememberMe: false
  });

  const signUpFormRef = useFormRef();

  const signUp = async () => {
    const signUpFormHasError = await formValidate(
      signUpFormRef.value
    );

    if (!signUpFormHasError) {
      signUpLoading.value = true;

      const success = await authStore
        .signIn({
          ...signUpFormModel
        });

      signedUp.value = success;
      signUpLoading.value = false;
    }
  };

  return {
    signUpFormModel,
    signUpFormRef,
    signedUp,
    submitButtonRegisterLoading,
    signUp
  };
}
