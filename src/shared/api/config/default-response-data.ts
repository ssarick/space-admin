import { AxiosResponse } from 'axios';
import { IResponseData } from '@/shared/types/api.types';

export const createDefaultApiResponseData = (
  data?: IResponseData
): Partial<AxiosResponse<IResponseData>> => ({
  data: {
    item: {},
    items: [],
    totalCount: 0,
    totalPages: 0,
    error: true,
    ...(data || {})
  }
});
