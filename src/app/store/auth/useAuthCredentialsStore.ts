import { readonly } from 'vue';
import { defineStore } from 'pinia';
import { AdminJwtPayload, IAuthResponse, IAuthToken } from '@/shared/types/auth.types';
import authBrowserStore from '@/shared/utils/auth-browser-store';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import JwtUtils from '@/shared/utils/jwt';

export const useAuthCredentialsStore = defineStore(
  'auth-credentials',
  () => {
    const accessToken = ref<string>(authBrowserStore.accessToken.value);
    const refreshToken = ref<string>(authBrowserStore.refreshToken.value);
    const rememberMe = ref(authBrowserStore.rememberMe);
    const authExpiryInSeconds = ref(0);

    const accessTokenPayload = computed<AdminJwtPayload | null>(
      () => JwtUtils.parsePayload(accessToken.value)
    );

    // const isAuth = computed<boolean>(
    //   () => !!accessToken.value
    // );

    const isAuth = computed<boolean>(
      // () => false
      () => true
    );

    const getTokenForStore = (
      value: string
    ): IAuthToken => {
      const token: IAuthToken = { value };

      token.expires = rememberMe.value
        ? new Date(Date.now() + (authExpiryInSeconds.value *
          dateShortcuts.MS_IN_SEC))
        : undefined;

      return token;
    };

    const setAccessToken = (value: string) => {
      accessToken.value = value;

      authBrowserStore.accessToken = getTokenForStore(
        accessToken.value
      );
    };

    const setRefreshToken = (value: string) => {
      refreshToken.value = value;

      authBrowserStore.refreshToken = getTokenForStore(
        refreshToken.value
      );
    };

    const setRememberMe = (value: boolean) => {
      rememberMe.value = value;
      authBrowserStore.rememberMe = rememberMe.value;
    };

    const setAuthCredentials = (
      payload?: IAuthResponse
    ) => {
      authExpiryInSeconds.value = payload?.refresh_expires_in || 0;

      setAccessToken(payload?.access_token || '');
      setRefreshToken(payload?.refresh_token || '');
    };

    return {
      isAuth,
      accessTokenPayload,
      accessToken: readonly(accessToken),
      refreshToken: readonly(refreshToken),
      setRememberMe,
      setAccessToken,
      setRefreshToken,
      setAuthCredentials
    };
  }
);
