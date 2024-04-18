import { IResponseData } from '@/shared/types/api.types';
import { ISelectOption } from '@/shared/types/select.types';
import {
  LogsAuditFetchPayload,
  LogsAuditItem
} from '../types/logs-audit.types';
import api from './instance';

export const fetchList = async (
  params?: LogsAuditFetchPayload
): Promise<IResponseData<LogsAuditItem>> => {
  const { data } = await api
    .get('list', { params });

  return data;
};

export const fetchServices = async ():
  Promise<IResponseData<ISelectOption>> => {
  const { data } = await api
    .get('service/list');

  return data;
};

export const fetchActions = async ():
  Promise<IResponseData<ISelectOption>> => {
  const { data } = await api
    .get('action/list');

  return data;
};

export const fetchExcelFile = async (
  params?: LogsAuditFetchPayload
): Promise<Blob | undefined> => {
  const { data } = await api
    .get('file', {
      params,
      responseType: 'blob'
    });

  return data as Blob;
};
