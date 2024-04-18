import { IResponseData } from '@/shared/types/api.types';
import { IOperDay, IOperDayTogglePayload } from '@/projects/b2b/shared/types/oper-day.types';
import api from './instance';

export const getOperDay = async ():
  Promise<IResponseData<IOperDay>> => {
  const { data } = await api
    .get('/api/oper-day-all-states');

  return data;
};

export const toggleDocumentState = async (
  {
    branch,
    state
  }: Required<IOperDayTogglePayload>
): Promise<IResponseData> => {
  const { data } = await api
    .put(`/api/branches/${branch}/document/${state}`);

  return data;
};

export const toggleAllDocumentsState = async (
  { state }: IOperDayTogglePayload
): Promise<IResponseData> => {
  const { data } = await api
    .put(`/api/branches/document/${state}`);

  return data;
};

export const toggleReportState = async (
  {
    branch,
    state
  }: Required<IOperDayTogglePayload>
): Promise<IResponseData> => {
  const { data } = await api
    .put(`/api/branches/${branch}/report/${state}`);

  return data;
};

export const toggleAllReportsState = async (
  { state }: IOperDayTogglePayload
): Promise<IResponseData> => {
  const { data } = await api
    .put(`/api/branches/report/${state}`);

  return data;
};
