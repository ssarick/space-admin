import type { IResponseData } from '@/shared/types/api.types';
import apiNotificationService from '@/projects/notification-service/shared/api/instance';
import type {
  AllMessagesClient,
  AllMessagesFiltersPayload
} from '@/projects/notification-service/shared/types/all-messages.types';
import type {
  GroupMessagesClient,
  GroupMessagesFiltersPayload,
  GroupMessagesStatus
} from '@/projects/notification-service/shared/types/group-messages.types';
import type {
  ChangeMessageStatusPayload,
  SendMessageApiResponseType,
  SendMessageRequestPayload
} from '@/projects/notification-service/shared/types/send-message.types';

export const fetchAllMessages = async (
  params: AllMessagesFiltersPayload
): Promise<IResponseData<AllMessagesClient>> => {
  const { data } = await apiNotificationService
    .get(
      'info/search',
      {
        params
      }
    );

  return {
    ...data,
    item: data.item,
    totalCount: data.item.totalCount
  };
};

export const sendMessageToOne = async (
  params: SendMessageRequestPayload
): Promise<IResponseData<SendMessageApiResponseType>> => {
  const { data } = await apiNotificationService
    .post(
      'sms/send-async/template',
      params
    );

  return data;
};

export const sendMessageToAll = async (
  params: SendMessageRequestPayload
): Promise<IResponseData<SendMessageApiResponseType>> => {
  const formData = new FormData();

  for (const [ key, value ] of Object.entries(params)) {
    formData.append(key, value as string | Blob);
  }

  const { data } = await apiNotificationService
    .post(
      'mass-mailing/upload',
      formData
    );

  return data;
};

export const changeStatusOfGroupedMessage = async (
  params: ChangeMessageStatusPayload
): Promise<IResponseData> => {
  const { data } = await apiNotificationService
    .post(
      'mass-mailing/update-status',
      params
    );

  return data;
};

export const fetchGroupMessages = async (
  params: GroupMessagesFiltersPayload
): Promise<IResponseData<GroupMessagesClient>> => {
  const { data } = await apiNotificationService
    .get(
      'mass-mailing/search',
      {
        params
      }
    );

  return {
    ...data,
    item: data.items[0]
  };
};

export const fetchMessageStatuses = async (
): Promise<GroupMessagesStatus> => {
  const { data } = await apiNotificationService
    .get(
      'info/message-statuses'
    );

  return data;
};

export const fetchMessageStatusesById = async (
  id: string | string[]
): Promise<IResponseData<GroupMessagesStatus>> => {
  const { data } = await apiNotificationService
    .get(
      `mass-mailing/count-status-messages/by-id?id=${id}`
    );

  return data;
};

export const fetchMessagesReportFile = async (
  params: AllMessagesFiltersPayload
): Promise<IResponseData<Blob | undefined>> => {
  const { data } = await apiNotificationService
    .get('info/export/excel', {
      params,
      responseType: 'blob'
    });
  return {
    ...data,
    item: data as Blob
  };
};
