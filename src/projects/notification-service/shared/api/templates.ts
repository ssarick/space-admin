import type { ApiInstance, IResponseData } from '@/shared/types/api.types';
import apiNotificationService from '@/projects/notification-service/shared/api/instance';
import type {
  CreateMessageTemplatePayload,
  MessageTemplateModel,
  MessageTemplatesFiltersPayload
} from '@/projects/notification-service/shared/types/send-message.types';

export const fetchAllTemplates = async (
  { ...params }: MessageTemplatesFiltersPayload
): Promise<IResponseData<MessageTemplateModel>> => {
  const { data } = await apiNotificationService
    .get(
      'template/search',
      {
        params
      }
    );

  return {
    ...data,
    item: data.items[0]
  };
};

export const createTemplate = async (
  { ...params }: CreateMessageTemplatePayload
): Promise<IResponseData<MessageTemplateModel>> => {
  const { data } = await apiNotificationService
    .post(
      'template/create',
      {
        ...params
      }
    );

  return {
    ...data,
    item: data.items[0]
  };
};

export const deleteTemplate = async (
  id: CreateMessageTemplatePayload['id']
): Promise<ApiInstance> => {
  const { data } = await apiNotificationService
    .delete(
      `template/${id}`
    );

  return data;
};
