import { IResponseData } from '@/shared/types/api.types';
import TimerUtils from '@/shared/utils/timer';
import { INotification, INotificationError } from '@/projects/superadmin/shared/types/notifications.types';
import api from './instance';

export const fetchNotifications = async():
  Promise<IResponseData<INotification>> => {
  console.warn('fetchNotifications');
  await TimerUtils.sleep(400);

  return {
    items: [
      {
        id: 34,
        text: 'Label'
      },
      {
        id: 35,
        text: 'Label'
      },
      {
        id: 36,
        text: 'Label'
      },
      {
        id: 37,
        text: 'Label'
      },
      {
        id: 38,
        text: 'Label'
      }
    ],
    item: {},
    totalCount: 0,
    totalPages: 0,
    error: false
  } as IResponseData;

  const { data } = await api
    .get(''); // TODO

  return data;
};

export const fetchNotificationErrors = async ():
  Promise<IResponseData<INotificationError>> => {
  console.warn('fetchNotificationErrors');
  await TimerUtils.sleep(400);

  return {
    items: [
      {
        id: 34,
        text: 'Label'
      },
      {
        id: 35,
        text: 'Label'
      },
      {
        id: 36,
        text: 'Label'
      },
      {
        id: 37,
        text: 'Label'
      },
      {
        id: 38,
        text: 'Label'
      }
    ],
    item: {},
    totalCount: 0,
    totalPages: 0,
    error: false
  } as IResponseData;

  const { data } = await api
    .get(''); // TODO

  return data;
};

export const sendNotificationErrorsToAdmin = async (
  id: number[]
): Promise<IResponseData> => {
  console.warn('sendNotificationErrorsToAdmin', id);
  await TimerUtils.sleep(400);

  return {
    item: {},
    totalCount: 0,
    totalPages: 0,
    error: false
  } as IResponseData;

  const { data } = await api
    .post(`${id}`); // TODO

  return data;
};
