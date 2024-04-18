import { AxiosRequestConfig } from 'axios';
import { ApiResponseCode, IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import ContractMapper from '@/projects/autopay/shared/mappers/contract';
import {
  IContract,
  IContractDetail,
  IContractListSearchPayload,
  IContragent
} from '@/projects/autopay/shared/types/contract.types';
import api from './instance';

export const getContractById = async (
  contractId: number,
  requestConfig?: AxiosRequestConfig
): Promise<IResponseData<IContractDetail>> => {
  const { data } = await api
    .get(
      `/clearing/loan/info/${contractId}`,
      requestConfig
    );

  return data;
};

export const fetchContracts = async (
  params?: IPagination,
  requestConfig?: AxiosRequestConfig
): Promise<IResponseData<IContract>> => {
  const { data } = await api
    .get('/clearing/contracts', {
      params,
      ...(requestConfig || {})
    });

  data.items = ContractMapper
    .toContracts(data.items);

  return data;
};

export const searchContracts = async (
  { contractId, ...params }: IContractListSearchPayload
): Promise<IResponseData<IContract>> => {
  if (contractId) {
    const data = await getContractById(contractId, {
      hideErrorMessageForCodes: [
        ApiResponseCode.CONTRACT_NOT_FOUND_CODE,
        ApiResponseCode.LOAN_ACCOUNTS_NOT_FOUND_CODE
      ]
    });

    return ContractMapper
      .detailToContractsResponse(data);
  }

  return fetchContracts(params);
};

export const fetchCoborrowersByContractId = async (
  contractId: number
): Promise<IResponseData<number>> => {
  const { data } = await api
    .get(`/clearing/loan/coborrowers/${contractId}`, {
      hideErrorMessageForCodes: [
        ApiResponseCode.COBORROWER_IDS_NOT_FOUND
      ]
    });

  return data;
};

export const getContragentById = async (
  contragentId: number
): Promise<IResponseData<IContragent>> => {
  const { data } = await api
    .get(`/clearing/client-info/${contragentId}`);

  return data;
};
