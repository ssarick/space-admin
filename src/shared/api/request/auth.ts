import { globalConfig } from '@/shared/config/global-config';
import { ApiEndpoint, IResponseData } from '@/shared/types/api.types';
import {
  AuthGrantType,
  IAuthClientParams,
  IAuthedUser,
  IAuthRefreshParams,
  IAuthResponse,
  ISignInParams,
  ISignOutParams
} from '@/shared/types/auth.types';
import globalApis from './global';

const getAuthFullParams = <T extends object>(
  grant_type: AuthGrantType,
  payload: T
): T & IAuthClientParams => ({
  ...payload,
  client_id: globalConfig.apiAuthClientId,
  client_secret: globalConfig.apiAuthClientSecret,
  grant_type,
  scope: 'openid'
});

const auth = async (
  grant_type: AuthGrantType,
  payload: ISignInParams | IAuthRefreshParams
): Promise<IResponseData<IAuthResponse>> => {
  const response = await globalApis
    .api
    ?.post(
      `${globalConfig.apiAuthUrl}/token`,
      new URLSearchParams(
        getAuthFullParams(
          grant_type, payload
        ) as {}
      ),
      {
        endpoint: ApiEndpoint.KC_AUTH
      }
    );

  return response?.data;
};

export const whoAmI = async (): Promise<
  IResponseData<IAuthedUser>
> => {
  const response = await globalApis
    .api
    ?.get(
      `${globalConfig.apiAuthUrl}/userinfo`,
      {
        hideErrorMessage: true,
        endpoint: ApiEndpoint.KC_AUTH
      }
    );

  return response?.data;
};

export const signIn = async (
  payload: ISignInParams
): Promise<IResponseData<IAuthResponse>> =>
  auth(AuthGrantType.password, payload);

export const refreshAuth = async (
  payload: IAuthRefreshParams
): Promise<IResponseData<IAuthResponse>> =>
  auth(AuthGrantType.refresh_token, payload);

export const signOut = async (
  payload: ISignOutParams
): Promise<IResponseData<void>> => {
  const {
    grant_type,
    scope,
    ...params
  } = getAuthFullParams(
    AuthGrantType.refresh_token, payload
  );

  const response = await globalApis
    .api
    ?.post(
      `${globalConfig.apiAuthUrl}/logout`,
      new URLSearchParams(params),
      {
        endpoint: ApiEndpoint.KC_AUTH,
        logoutOnError: true
      }
    );

  return response?.data;
};
