import { AxiosError } from 'axios';
import BaseApiErrorManager from '@/shared/api/manager/base/base-api-error-manager';
import i18n from '@/shared/plugins/i18n';
import { ApiErrorResponse, IApiError } from '@/shared/types/api.types';
import { toast } from '@/shared/utils/toast';

export default class ApiMessageManager extends BaseApiErrorManager {

  errorMessages = {
    401: 'Session-expired',
    403: 'forbidden',
    default: 'Connection-error'
  };

  checkIfErrorResponseItFits(
    error: AxiosError<IApiError>
  ): boolean {
    const errorCode = error.response?.data?.code;

    return !error.config?.hideErrorMessage
      && !(errorCode && error
        .config
        ?.hideErrorMessageForCodes
        ?.includes(errorCode));
  }

  async handleErrorResponse(
    error: AxiosError<IApiError>
  ): Promise<ApiErrorResponse> {
    toast.value?.error(
      error.response?.data?.message
        || i18n.global.t(
          this.errorMessages[error.response?.status!]
            || this.errorMessages.default
        )
    );
  }

}
