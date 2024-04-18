import { AxiosError, AxiosRequestConfig } from 'axios';
import BaseApiErrorManager from '@/shared/api/manager/base/base-api-error-manager';
import { ApiErrorResponse } from '@/shared/types/api.types';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import globalApis from '../request/global';

export default class ApiRefreshTokenManager extends
  BaseApiErrorManager {

  protected handler: Promise<boolean> | null = null;

  async generate(): Promise<boolean> {
    if (!this.handler) {
      this.handler = useAuthStore()
        .refreshAuth()
        .then(refreshTokenUpdated => {
          setTimeout(() => (this.handler = null));

          return refreshTokenUpdated;
        });
    }

    return this.handler;
  }

  checkIfErrorResponseItFits(error: AxiosError): boolean {
    if (error.config?.skipRefreshTokenHandling)
      return false;

    return (
      error.response?.status === 401
        || error.request?.status === 401
    );
  }

  async handleErrorResponse(error: AxiosError): Promise<ApiErrorResponse> {
    const refreshTokenGenerated = await this.generate();

    if (refreshTokenGenerated) {
      if (error.config?.headers?.Authorization)
        delete error.config.headers.Authorization;

      return globalApis.api?.request(
        error.config as AxiosRequestConfig
      );
    }
  }

}
