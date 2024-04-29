import { computed, ref } from 'vue';
import { IResponseData } from '@/shared/types/api.types';
import {
  IClient,
  IClientFetchByAnyCodeParams,
  IClientStatusUpdateBody,
  IClientStatusUpdatedResponse
} from '@/projects/b2b/shared/types/client.types';
import {
  IUserByIdQueryParams,
  IUserQueryParams
} from '@/projects/b2b/shared/types/user.types';
import api from './instance';

const path = ref<{ businessCode?: string; branch: string }>({
  businessCode: undefined,
  branch: '0'
});

const baseUrl = computed(() => {
  let url = `/api/branches/${path.value.branch}/businesses`;
  const { businessCode } = path.value;

  if (path.value.businessCode) url += '/' + businessCode;

  return url;
});

export const fetchClients = async (payload: {
  query?: IUserQueryParams
  path: { branch: string }
}): Promise<IResponseData<IClient>> => {
  path.value = payload.path;

  const { data } = await api.get(baseUrl.value, {
    params: payload.query
  });

  return data;
};

export const fetchClientsByAnyCode = async (
  {
    branch,
    anyCode
  }: IClientFetchByAnyCodeParams
): Promise<IResponseData<IClient>> => {
  const { data } = await api
    .get(
      '/api/branches/' +
        `${branch}/businesses/` +
        `${anyCode}/search`
    );

  return data;
};

export const fetchClientById = async (payload: {
  query?: IUserByIdQueryParams
  path: { branch: string; businessCode: string }
}): Promise<IResponseData<IClient>> => {
  path.value = payload.path;

  const { data } = await api.get(baseUrl.value, {
    params: payload.query
  });

  return data;
};

export const addNewClientToClientBranch = async (payload: {
  path: { branch: string; businessCode: string }
}): Promise<IResponseData<IClient>> => {
  path.value = payload.path;

  const { data } = await api.post(baseUrl.value);

  return data;
};

export const changeClientStatus = async ({
  state,
  clientBlockingReasonId
}: IClientStatusUpdateBody): Promise<
  IResponseData<IClientStatusUpdatedResponse>
> => {
  const { data } = await api.put(`${baseUrl.value}/state/${state}`, {
    clientBlockingReasonId
  });

  return data;
};
