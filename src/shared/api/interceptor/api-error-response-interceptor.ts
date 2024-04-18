import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/shared/types/api.types';
import { createDefaultApiResponseData } from '../config/default-response-data';
import BaseApiErrorManager from '../manager/base/base-api-error-manager';
import BaseApiResponseInterceptor from './base/base-api-response-interceptor';

export default class ApiErrorResponseInterceptor extends BaseApiResponseInterceptor {
  protected managers: BaseApiErrorManager[] = [];

  constructor(managers: BaseApiErrorManager[] = []) {
    super();

    this.managers = [ ...managers ];
  }

  async intercept(error: AxiosError): Promise<ApiErrorResponse> {
    console.error(
      'Received an error in the BaseApiErrorManagerController',
      error
    );

    for (let index = 0; index < this.managers.length; index++) {
      const manager = this.managers[index];

      if (manager.checkIfErrorResponseItFits(error)) {
        const managerResult = await manager.handleErrorResponse(error);

        if (managerResult) return managerResult;

        break;
      }
    }

    return createDefaultApiResponseData();
  }
}
