import { IResponseData } from '@/shared/types/api.types';
import {
  SubsidyApplication,
  SubsidyApplicationDeletePayload,
  SubsidyApplicationFetchPayload,
  SubsidyApplicationItemFetchPayload,
  SubsidyApplicationSendToMinfinPayload,
  SubsidyApplicationUpdatePayload,
  SubsidyApplicationUploadPayload,
  SubsidyContract,
  SubsidyMinfinStatus,
  SubsidySentStatus
} from '../types/application.types';
import apiSubsidy from './instance';

export const fetchApplications = async (
  {
    pageSize,
    pageNumber,
    ...params
  }: SubsidyApplicationFetchPayload
): Promise<IResponseData<SubsidyApplication>> => {
  const { data } = await apiSubsidy
    .get('get-subsidies', {
      params: {
        pageNum: pageNumber,
        pageSize: pageSize,
        ...params
      }
    });

  return data;
};

export const uploadExcel = async (
  { excelFile }: SubsidyApplicationUploadPayload
): Promise<IResponseData> => {
  const formData = new FormData();

  formData.append('file', excelFile);

  const { data } = await apiSubsidy
    .post('excel/upload', formData);

  return data;
};

export const sendToMinfin = async (
  payload: SubsidyApplicationSendToMinfinPayload
): Promise<IResponseData<SubsidySentStatus>> => {
  const { data } = await apiSubsidy
    .post('prepare-to-send', payload.ids);

  return data;
};

export const editApplication = async (
  payload: SubsidyApplicationUpdatePayload
): Promise<IResponseData> => {
  const { data } = await apiSubsidy
    .post('edit-subsidy', payload);

  return data;
};

export const deleteApplication = async (
  { id }: SubsidyApplicationDeletePayload
): Promise<IResponseData> => {
  const { data } = await apiSubsidy
    .delete(`delete-subsidy/${id}`);

  return data;
};

export const fetchApplicationItem = async (
  { id }: SubsidyApplicationItemFetchPayload
): Promise<IResponseData<SubsidyApplication>> => {
  const { data } = await apiSubsidy
    .get(`get-subsidy/${id}`);

  return data;
};

export const fetchContractTypes = async ():
  Promise<IResponseData<SubsidyContract>> => {
  const { data } = await apiSubsidy
    .get('get-contract-types');

  return data;
};

export const fetchMinfinStatuses = async ():
  Promise<IResponseData<SubsidyMinfinStatus>> => {
  const { data } = await apiSubsidy
    .get('minfin/statuses-info');

  return data;
};
