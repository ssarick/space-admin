import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/shared/types/api.types';

export default abstract class BaseApiErrorManager {

  checkIfErrorResponseItFits(
    _error: AxiosError
  ): boolean {
    return true;
  }

  abstract handleErrorResponse(
    error: AxiosError
  ): Promise<ApiErrorResponse>;

}
