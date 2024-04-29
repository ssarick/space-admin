import { AxiosResponse } from 'axios';
import BaseApiResponseInterceptor from '@/shared/api/interceptor/base/base-api-response-interceptor';
import {
  ApiResponseItemsGetter,
  ApiResponseItemsValue,
  IResponseData
} from '@/shared/types/api.types';

export default class ApiSuccessResponseInterceptor
  extends BaseApiResponseInterceptor {

  responseItemsGetters: ApiResponseItemsGetter[] = [
    (response: AxiosResponse) => response.data,
    (response: AxiosResponse) => response.data?.content,
    (response: AxiosResponse) => response.data?.data
  ];

  getResponseItems(
    response: AxiosResponse
  ): ApiResponseItemsValue[] {
    for (const getter of this.responseItemsGetters) {
      const result = getter(response);

      if (Array.isArray(result))
        return [ ...result ];
    }

    return [];
  }

  async intercept(
    response: AxiosResponse
  ): Promise<AxiosResponse<IResponseData>> {
    const responseData: Record<string, unknown> = {
    };

    if (response.data instanceof ArrayBuffer
      || response.data instanceof Blob) {
      return response;
    }

    responseData.items = this.getResponseItems(
      response
    );

    responseData.item = response.data?.data
      || response.data
      || {
      };

    responseData.error = false;
    responseData.totalCount = response.data?.totalCount || 0;
    responseData.totalPages = response.data?.totalPages || 0;
    response.data = responseData;

    return response;
  }

}
