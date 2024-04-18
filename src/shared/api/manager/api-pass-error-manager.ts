import { AxiosError } from 'axios';
import BaseApiErrorManager from '@/shared/api/manager//base/base-api-error-manager';
import { ApiErrorResponse } from '@/shared/types/api.types';

export default class ApiPassErrorManager extends BaseApiErrorManager {
  checkIfErrorResponseItFits(error: AxiosError): boolean {
    return !!error.config?.passError;
  }

  async handleErrorResponse(error: AxiosError): Promise<ApiErrorResponse> {
    return Promise.reject(error);
  }
}
