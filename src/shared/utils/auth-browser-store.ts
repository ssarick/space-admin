import Cookies, { CookieSetOptions } from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import { globalConfig } from '../config/global-config';
import {
  AuthBrowserStoreKey,
  AuthPanel,
  IAuthToken
} from '../types/auth.types';

const cookies = new Cookies();
let fingerprint: string | null;

const cookiesCommonOptions: CookieSetOptions = {
  path: '/',
  secure: !globalConfig.isDevEnv
};

const getCookieToken = (
  key: AuthBrowserStoreKey
): IAuthToken => ({
  value: cookies.get(key)
});

const setCookieToken = (
  key: AuthBrowserStoreKey,
  { expires, value }: IAuthToken
) => cookies.set(
  key, value, {
    ...cookiesCommonOptions,
    expires
  }
);

const getFromLocalStorage = (
  key: string
): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {}

  return null;
};

const setToLocalStorage = (
  key: string,
  value: string
) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

export default {
  get accessToken(): IAuthToken {
    return getCookieToken(AuthBrowserStoreKey.accessToken);
  },

  set accessToken(payload: IAuthToken) {
    setCookieToken(
      AuthBrowserStoreKey.accessToken, payload
    );
  },

  get refreshToken(): IAuthToken {
    return getCookieToken(AuthBrowserStoreKey.refreshToken);
  },

  set refreshToken(payload: IAuthToken) {
    setCookieToken(
      AuthBrowserStoreKey.refreshToken, payload
    );
  },

  get rememberMe(): boolean {
    return !!getFromLocalStorage(
      AuthBrowserStoreKey.rememberMe
    );
  },

  set rememberMe(value: boolean) {
    setToLocalStorage(
      AuthBrowserStoreKey.rememberMe,
      value ? '1' : ''
    );
  },

  get panel(): AuthPanel | null {
    const panel = +cookies.get(
      AuthBrowserStoreKey.panel
    );

    return AuthPanel[panel] ? panel : null;
  },

  set panel(value: AuthPanel | null) {
    cookies.set(
      AuthBrowserStoreKey.panel,
      (value !== null && AuthPanel[value]) ? value : '',
      cookiesCommonOptions
    );
  },

  get fingerprint(): string {
    if (fingerprint) return fingerprint;

    fingerprint = getFromLocalStorage(
      AuthBrowserStoreKey.fingerprint
    );

    if (fingerprint) return fingerprint;

    fingerprint = uuidv4();

    setToLocalStorage(
      AuthBrowserStoreKey.fingerprint, fingerprint
    );

    return fingerprint;
  }
};
