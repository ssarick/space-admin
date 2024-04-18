import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { ApiAuth } from '@/shared/api/request';
import i18n from '@/shared/plugins/i18n';
import {
  IAuthedUser,
  IProfile,
  ISignInFormModel
} from '@/shared/types/auth.types';
import { toast } from '@/shared/utils/toast';
import { useAuthCredentialsStore } from './useAuthCredentialsStore';

export const useAuthStore = defineStore('auth', () => {
  const userLoading = ref(false);
  const user = ref<IAuthedUser | null>(null);
  const exitWarningModal = ref(false);

  const {
    setAuthCredentials,
    isAuth,
    refreshToken,
    setRememberMe
  } = toRefs(useAuthCredentialsStore());

  const profile = computed<IProfile | null>(
    () => user.value
  );

  const signIn = async (
    {
      rememberMe,
      ...formData
    }: ISignInFormModel
  ): Promise<boolean> => {
    const { error, item } = await ApiAuth
      .signIn(formData);

    error && toast.value?.error(
      i18n.global.t('Login-or-password-invalid')
    );

    setAuthCredentials.value(item);
    setRememberMe.value(error ? false : !!rememberMe);

    return !error;
  };

  const signOut = async () => {
    refreshToken.value && ApiAuth.signOut({
      refresh_token: refreshToken.value
    });

    setAuthCredentials.value();
    setRememberMe.value(false);
  };

  const refreshAuth = async (): Promise<boolean> => {
    if (!refreshToken.value) return false;

    const { error, item } = await ApiAuth
      .refreshAuth({
        refresh_token: refreshToken.value
      });

    error || setAuthCredentials.value(item);

    return !error;
  };

  const loadAuthedUser = async () => {
    if (!refreshToken.value) return;

    userLoading.value = true;

    const { error, item } = await ApiAuth.whoami();

    if (error) {
      setAuthCredentials.value();
    } else {
      user.value = {
        ...item,
        branch: '00445' // TODO mock
      };
    }

    userLoading.value = false;
  };

  const setExitWarningModal = (value?: boolean) => {
    exitWarningModal.value = !!value;
  };

  loadAuthedUser();

  return {
    isAuth,
    userLoading,
    user,
    profile,
    exitWarningModal,
    signIn,
    signOut,
    refreshAuth,
    loadAuthedUser,
    setExitWarningModal
  };
});
