import { ApiCreatedResponse, IResponseData } from '@/shared/types/api.types';
import {
  InternalNotificationCreatePayload,
  InternalNotificationUploadPayload
} from '../types/internal-notification.types';
import apiInternalNotification from './instance';

export const create = async (
  payload: InternalNotificationCreatePayload
): Promise<IResponseData<ApiCreatedResponse>> => {
  const { data } = await apiInternalNotification
    .post('', payload);

  return data;
};

export const uploadFile = async (
  { id, file }: InternalNotificationUploadPayload
): Promise<IResponseData> => {
  const formData = new FormData();

  formData.append('file', file);

  const { data } = await apiInternalNotification
    .post(`file/${id}`, formData);

  return data;
};
