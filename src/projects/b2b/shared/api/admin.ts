import { IResponseData } from '@/shared/types/api.types';
import {
  IAdmin,
  IAdminCreationPayload,
  IAdminCreationResponse,
  IAdminSearchPayload,
  IAdminUpdatePayload,
  IAdminUpdateStatePayload
} from '@/projects/b2b/shared/types/admin.types';
import api from './instance';

export const fetchAdmins = async (
  params: IAdminSearchPayload
): Promise<IResponseData<IAdmin>> => {
  const { data } = await api
    .get('/api/admins', { params });

  return data;
};

export const createAdmin = async (
  {
    branch,
    ...payload
  }: IAdminCreationPayload
): Promise<IResponseData<IAdminCreationResponse>> => {
  const { data } = await api
    .post(
      `/api/branches/${branch}/admin`,
      payload
    );

  return data;
};

export const updateAdminState = async (
  {
    adminId,
    stateId,
    adminBlockingReasonId
  }: IAdminUpdateStatePayload
): Promise<IResponseData> => {
  const { data } = await api
    .put(
      `/api/admins/${adminId}` +
        `/state/${stateId}`,
      { adminBlockingReasonId }
    );

  return data;
};

export const resetAdminPassword = async (
  id: number
): Promise<IResponseData> => {
  const { data } = await api
    .get(
      `/api/admins/${id}/admin-reset-password`
    );

  return data;
};

export const deleteAdmin = async (
  id: number
): Promise<IResponseData> => {
  const { data } = await api
    .delete(`/api/admins/${id}/delete`);

  return data;
};

export const updateAdmin = async (
  {
    id,
    ...payload
  }: IAdminUpdatePayload
) => {
  const { data } = await api
    .put(`/api/admins/${id}/update`, payload);

  return data;
};

export const fetchAdminById = async (
  id: number
): Promise<IResponseData<IAdmin>> => {
  const { data } = await api
    .get(`/api/admins/${id}`);

  return data;
};
