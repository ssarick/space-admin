import { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse, IResponseData } from '@/shared/types/api.types';

export default abstract class BaseApiResponseInterceptor {

  abstract intercept(
    response: AxiosResponse | AxiosError
  ): Promise<AxiosResponse<IResponseData> | ApiErrorResponse>;

}
