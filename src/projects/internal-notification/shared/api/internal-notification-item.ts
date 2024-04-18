import { ApiUrlPlaceholder, IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import {
  InternalNotification,
  InternalNotificationCount,
  InternalNotificationReadPayload
} from '../types/internal-notification.types';
import apiInternalNotification from './instance';

export const markAsRead = async (
  payload: InternalNotificationReadPayload
): Promise<IResponseData> => {
  const { data } = await apiInternalNotification
    .patch('mark/as-read', payload);

  return data;
};

export const markAsReadAllByService = async ():
  Promise<IResponseData> => {
  const { data } = await apiInternalNotification
    .patch(`mark/as-read/${ApiUrlPlaceholder.AUTH_PANEL}`);

  return data;
};

export const getUnreadCount = async ():
  Promise<IResponseData<InternalNotificationCount>> => {
  const { data } = await apiInternalNotification
    .get(`unread/count/${ApiUrlPlaceholder.AUTH_PANEL}`);

  return data;
};

export const fetchList = async (
  params?: IPagination
): Promise<IResponseData<InternalNotification>> => {
  const { data } = await apiInternalNotification
    .get(`list/${ApiUrlPlaceholder.AUTH_PANEL}`, { params });

  return data;
};

export const getLastVersion = async ():
  Promise<IResponseData<InternalNotification>> => {
  const { data } = await apiInternalNotification
    .get(`last-version/${ApiUrlPlaceholder.AUTH_PANEL}`);

  return data;
};

export const getPublicLastVersion = async ():
  Promise<IResponseData<InternalNotification>> => {
  const { data } = await apiInternalNotification
    .get('last-version');

  return data;
};
