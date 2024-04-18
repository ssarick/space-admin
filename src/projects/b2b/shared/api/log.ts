import { IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import {
  ILogsCreatedReport,
  ILogsFilter,
  ILogsReport,
  ILogsReportInfo
} from '@/projects/b2b/shared/types/log.types';
import api from './instance';

export const fetchReport = async (
  reportId: string
): Promise<IResponseData<ILogsReport>> => {
  const { data } = await api
    .get(`api/reports/${reportId}`, {
      hideErrorMessage: true
    });

  return data;
};

export const fetchReports = async (
  params: IPagination
): Promise<
  IResponseData<ILogsReportInfo>
> => {
  const { data } = await api
    .get('api/reportsInfo', { params });

  return data;
};

export const createReport = async (
  payload: ILogsFilter
): Promise<IResponseData<ILogsCreatedReport>> => {
  const { data } = await api
    .post('/api/createReport', payload);

  return data;
};
