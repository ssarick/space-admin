import { PointAdmin } from '@/shared/types/admin.types';
import { ApiEndpoint, IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import { ISelectOption } from '@/shared/types/select.types';
import globalApis from './global';

export const fetchAdmins = async (
  {
    pageNumber = 1,
    pageSize
  }: IPagination
): Promise<IResponseData<PointAdmin>> => {
  const response = await globalApis
    .apiAdmin
    ?.get('roles/APP_EVENT_LOGGER_USER/users', {
      endpoint: ApiEndpoint.KC_AUTH,
      params: {
        first: pageNumber - 1,
        max: pageSize
      }
    });

  return response?.data;
};

export const fetchAdminsForSelect = async ():
Promise<IResponseData<ISelectOption>> => {
  const { items } = await fetchAdmins({
    pageNumber: 1,
    pageSize: 1000
  });

  return {
    items: items.map(item => ({
      value: item.username,
      label: item.firstName
        ? `${item.firstName} ${item.lastName}`
        : '',
      subLabel: item.username
    }))
  } as IResponseData<ISelectOption>;
};
