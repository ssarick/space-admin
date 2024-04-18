import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/shared/types/api.types';
import globalApis from '../request/global';
import BaseApiErrorManager from './base/base-api-error-manager';

export default class ApiRetryManager extends
  BaseApiErrorManager {

  checkIfErrorResponseItFits(error: AxiosError): boolean {
    return !!error.config?.retryCount;
  }

  async handleErrorResponse(error: AxiosError): Promise<ApiErrorResponse> {
    if (error.config?.retryCount) {
      error.config.retryCount--;

      if (error.config.retryCount === 1) error.config.retryCount = 0;

      return globalApis.api?.request(error.config);
    }
  }

}
