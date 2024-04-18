import { computed, ref } from 'vue';
import { IResponseData } from '@/shared/types/api.types';
import { IAccount, IAccountAccesses } from '@/projects/b2b/shared/types/account.types';
import api from './instance';

const path = ref<{
  businessCode?: string;
  branch: string;
  userId?: number;
  accountNumber?: string;
}>({
  userId: undefined,
  accountNumber: undefined,
  businessCode: '0',
  branch: '0'
});

const baseUrl = computed(() => {
  let url = `/api/branches/${path.value.branch}/businesses/${path.value.businessCode}/accounts`;

  const {
    accountNumber,
    userId
  } = path.value;

  if (userId && accountNumber) {
    url += `/${accountNumber}/user/${userId}`;
  }

  return url;
});

export const fetchAccounts = async (payload: {
  query?: {
    pageNumber: number;
    pageSize: number;
  };
  path: { branch: string; businessCode: string };
}): Promise<IResponseData<IAccount>> => {
  path.value = payload.path;

  const { data } = await api.get(baseUrl.value, {
    params: payload.query
  });

  return data;
};

export const toggleAccess = async (payload: {
  path: {
    branch: string;
    businessCode: string;
    userId: number;
    accountNumber: string;
  };
  body: {
    canPay: number;
    stateId: number;
  };
}): Promise<IResponseData<string>> => {
  path.value = payload.path;

  const { data } = await api.put(baseUrl.value, payload.body);

  return data;
};

export const toggleAllAccess = async (
  payload: IAccountAccesses
): Promise<IResponseData> => {
  const { data } = await api
    .put(
      `/api/branches/${payload.branch}` +
        `/businesses/${payload.businessCode}/accounts`,
      payload.accounts
    );

  return data;
};
