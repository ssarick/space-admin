import type { IResponseData } from '@/shared/types/api.types';
import type { ISelectResponseData } from '@/shared/types/select.types';
import { InventoryMapper } from '@/projects/inventory/shared/mappers/inventory';
import type {
  InventorySession,
  InventorySessionCreatePayload,
  InventoryStatusesOption
} from '@/projects/inventory/shared/types/sessions.types';
import type {
  InventoryApiResponse,
  InventoryPaginationPayload
} from '@/projects/inventory/shared/types/users.types';
import apiInventory from './instance';

export const fetchSessions = async (
  { ...params }: InventoryPaginationPayload
): Promise<IResponseData<InventorySession>> => {
  const { data } = await apiInventory
    .post(
      'Admin/sessions',
      {
        ...params
      }
    );

  return InventoryMapper.mapToInventorySessionsData(data.item);
};

export const fetchSessionsDetails = async (
  { ...params }: InventoryPaginationPayload
): Promise<IResponseData<InventorySession>> => {
  const { data } = await apiInventory
    .post(
      `Admin/${params.type}-equipment-list`,
      {
        page: params.page,
        count: params.count
      },
      {
        params: {
          sessionId: params.id
        }
      }
    );

  return InventoryMapper.mapToInventorySessionsData(data.item);
};

export const createInventorySession = async (
  { ...params }: InventorySessionCreatePayload
): Promise<IResponseData<InventorySession>> => {
  const { data } = await apiInventory
    .post(
      'Admin/sessions/add',
      {
        ...params
      }
    );

  return data;
};

export const finishInventorySession = async (
  sessionId: InventorySession['id']
): Promise<IResponseData<InventorySession>> => {
  const { data } = await apiInventory
    .post(
      `Admin/sessions/${sessionId}/disable`
    );
  return data;
};

export const fetchInventoryOfficesList = async(
): Promise<ISelectResponseData> => {
  const { data } = await apiInventory
    .get(
      'Admin/offices/available-list'
    );

  return {
    items: InventoryMapper.mapInventoryOffices(data.item),
    totalPages: 0,
    totalCount: 0,
    error: data.item.errors
  };
};

export const fetchInventoryUsersList = async(
): Promise<ISelectResponseData> => {
  const { data } = await apiInventory
    .get(
      'Admin/users/available-list'
    );

  return {
    items: InventoryMapper.mapInventoryUsers(data.item),
    totalPages: 0,
    totalCount: 0,
    error: data.item.errors
  };
};

export const fetchInventoryStatusesList = async(
): Promise<InventoryApiResponse<InventoryStatusesOption[]>> => {
  const { data } = await apiInventory
    .get(
      'Common/inventory-status-list'
    );

  return {
    httpStatus: data.item.httpStatus,
    result: data.item.result,
    errors: data.item.errors
  };
};

export const fetchSessionExcelFile = async (
  sessionId: InventoryPaginationPayload['id']
): Promise<InventoryApiResponse<Blob | undefined>> => {
  const { data } = await apiInventory
    .get(`Admin/${sessionId}/download-excel`, {
      responseType: 'blob'
    });

  return {
    httpStatus: data.httpStatus,
    errors: data.errors !== null,
    result: data as Blob
  };
};

export const fetchAllInventoryExcelFile = async (
): Promise<InventoryApiResponse<Blob | undefined>> => {
  const { data } = await apiInventory
    .get('Admin/equipments/download-excel', {
      responseType: 'blob'
    });

  return {
    httpStatus: data.httpStatus,
    errors: data.errors !== null,
    result: data as Blob
  };
};
