import { InternalAxiosRequestConfig } from 'axios';
import BaseApiRequestInterceptor from '@/shared/api/interceptor/base/base-api-request-interceptor';
import i18n from '@/shared/plugins/i18n';
import authBrowserStore from '@/shared/utils/auth-browser-store';
import { getTimezone } from '@/shared/utils/functions/timezone';
import { useAuthCredentialsStore } from '@/app/store/auth/useAuthCredentialsStore';
import ApiUrlPlaceholderReplacer from '../utils/placeholder/api-url-placeholder-replacer';

export default class ApiSuccessRequestInterceptor
  extends BaseApiRequestInterceptor {

  async intercept(
    request: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const authStore = useAuthCredentialsStore();

    if (authStore.accessToken && !request.headers.Authorization)
      request.headers.Authorization = `Bearer ${authStore.accessToken}`;

    if (request.endpoint)
      request.headers.Endpoint = request.endpoint;

    request.headers.fingerprint = authBrowserStore.fingerprint;
    request.headers.timezone = getTimezone().toString();
    request.headers['Accept-Language'] = i18n.global.locale.value;
    request.url = ApiUrlPlaceholderReplacer.replace(request.url || '');

    return request;
  }

}
