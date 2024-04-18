import type { IResponseData } from '@/shared/types/api.types';
import { InventoryMapper } from '@/projects/inventory/shared/mappers/inventory';
import type {
  InventoryApiResponse,
  InventoryPaginationPayload,
  InventoryUser,
  InventoryUserCreatePayload,
  InventoryUserDetail
} from '@/projects/inventory/shared/types/users.types';
import apiInventory from './instance';

export const fetchUsers = async (
  {
    ...params
  }: InventoryPaginationPayload
): Promise<IResponseData<InventoryUserDetail>> => {
  const { data } = await apiInventory
    .post(
      'Admin/users',
      { ...params }
    );

  return InventoryMapper.mapToInventoryUsersData(data.item);
};

export const createInventoryUser = async (
  {
    ...params
  }: InventoryUserCreatePayload
): Promise<IResponseData<InventoryUser>> => {
  const { data } = await apiInventory
    .post(
      'Admin/users/add',
      { ...params }
    );

  return data;
};

export const fetchUser = async (
  userId: InventoryUser['id']
): Promise<InventoryApiResponse<InventoryUser>> => {

  const { data } = await apiInventory.get(
    `Admin/users/${userId}/details`
  );

  return data.item;
};
