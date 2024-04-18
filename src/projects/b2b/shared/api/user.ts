import { computed, ref } from 'vue';
import { IResponseData } from '@/shared/types/api.types';
import {
  IClientUser,
  IUser,
  IUserLog,
  IUserLogsFetchingParams,
  IUserOrganization,
  IUserOrganizationFetchingParams,
  IUserPermission,
  IUserQueryParams,
  IUserRelations,
  IUserResetPasswordParams,
  IUserRole
} from '@/projects/b2b/shared/types/user.types';
import api from './instance';

const path = ref<{ businessCode: string; branch: string; userId?: number }>({
  businessCode: '0',
  branch: '0',
  userId: undefined
});

const baseUrl = computed(() => {
  let url = `/api/${path.value.branch}/${path.value.businessCode}/users`;

  const { userId } = path.value;
  if (userId) url += '/' + userId;

  return url;
});

export const fetchUsers = async (payload: {
  query: IUserQueryParams;
}): Promise<IResponseData<IUser>> => {
  const { data } = await api.get('/api/users', {
    params: payload.query
  });

  return data;
};

export const fetchClientUsers = async (payload: {
  query: IUserQueryParams;
  path: { businessCode: string; branch: string };
}): Promise<IResponseData<IUser>> => {
  path.value = payload.path;

  const { data } = await api.get(baseUrl.value, {
    params: payload.query
  });

  return data;
};

export const getById = async (
  userId: number
): Promise<IResponseData<IUser>> => {
  const { data } = await api.get(`/api/users/${userId}`);

  return data;
};

export const getClientUserById = async (payload: {
  path: { businessCode: string; branch: string; userId: number };
}): Promise<IResponseData<IClientUser>> => {
  path.value = payload.path;

  const { data } = await api.get(`${baseUrl.value}/personal-information`);

  return data;
};

export const fetchRelations = async (payload: {
  path: { businessCode: string; branch: string; userId: number };
}): Promise<IResponseData<IUserRelations>> => {
  path.value = payload.path;

  const { data } = await api.get(`${baseUrl.value}/relations`);

  return data;
};

export const updateRelations = async (payload: {
  path: { businessCode: string; branch: string; userId: number };
  body: { roleId: number; actionIdList: number[] };
}): Promise<IResponseData<{ role: IUserRole; modules: IUserPermission[] }>> => {
  path.value = payload.path;

  const { data } = await api.put(`${baseUrl.value}/relations`, payload.body);

  return data;
};

export const userCreate = async (payload: {
  path: { branch: string; businessCode: string };
  body: IUser;
}): Promise<IResponseData<{ userId: number }>> => {
  path.value = payload.path;

  const { data } = await api.post(baseUrl.value, payload.body);

  return data;
};

export const addExistUserToClient = async (payload: {
  path: { branch: string; businessCode: string };
  body: { userId: number };
}): Promise<IResponseData<string>> => {
  path.value = payload.path;

  const { data } = await api.put(baseUrl.value + '/attach-user', payload.body);

  return data;
};

export const changeUserStatus = async (payload: {
  path: { userId: number };
  body: { stateId: number; stateReasonId?: number };
}): Promise<IResponseData<string>> => {
  const { data } = await api.put(
    `/api/users/${payload.path.userId}/state`,
    payload.body
  );

  return data;
};

export const changeClientUserStatus = async (payload: {
  path: { branch: string; businessCode: string; userId: number };
  body: { stateId: number; stateReasonId?: number };
}): Promise<IResponseData<string>> => {
  path.value = payload.path;

  const { data } = await api.put(baseUrl.value + '/state', payload.body);

  return data;
};

export const fetchUserOrganizations = async ({
  userId,
  branch,
  ...params
}: IUserOrganizationFetchingParams): Promise<
  IResponseData<IUserOrganization>
> => {
  const { data } = await api.get(`/api/${branch}/${userId}/business`, {
    params
  });

  return data;
};

export const updateUser = async ({
  userId,
  ...body
}: IUser): Promise<IResponseData<string>> => {
  const { data } = await api.put(`/api/users/${userId}`, body);

  return data;
};

export const resetUserPassword = async ({
  userId
}: IUserResetPasswordParams): Promise<IResponseData<string>> => {
  const { data } = await api.put(
    `/api/users/${userId}/reset-password`
  );

  return data;
};

export const fetchUserLogs = async (
  { userId, ...params }: IUserLogsFetchingParams
): Promise<IResponseData<IUserLog>> => {
  const { data } = await api
    .get(`/api/users/${userId}/logs`, {
      params
    });

  return data;
};
