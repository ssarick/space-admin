import { IResponseData } from '@/shared/types/api.types';
import {
  IPaymentStatistics,
  IPaymentStatisticsPayload
} from '@/projects/autopay/shared/types/dashboard.types';
import api from './instance';

export const fetchPaymentStatistics = async (
  payload: IPaymentStatisticsPayload
): Promise<IResponseData<IPaymentStatistics[]>> => {
  const { data } = await api
    .post('payment/statistic', payload);

  return data;
};
