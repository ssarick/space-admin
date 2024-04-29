import { IResponseData } from '@/shared/types/api.types';
import {
  IFileManageDownloadable,
  IFileManageDownloadPayload,
  IFileManageFetchPayload,
  IFileManageFolderPayload,
  IFileManageItem
} from '../types/file-manage.types';
import apiFileManager from './instance';

export const fetchFiles = async (
  {
    searchCriteria,
    ...params
  }: IFileManageFetchPayload
): Promise<IResponseData<IFileManageItem>> => {
  const { data } = await apiFileManager
    .post(
      'file/search',
      {
        searchCriteria
      },
      {
        params
      }
    );

  return data;
};

export const fetchFolders = async (
  {
    bucketId,
    ...params
  }: IFileManageFolderPayload
): Promise<IResponseData<string>> => {
  const { data } = await apiFileManager
    .get(`bucket/${bucketId}/folders`, {
      params
    });

  return data;
};

export const fetchBuckets = async ():
Promise<IResponseData<string>> => {
  const { data } = await apiFileManager
    .get('bucket');

  return data;
};

export const downloadFile = async (
  params: IFileManageDownloadPayload
): Promise<IResponseData<IFileManageDownloadable>> => {
  const { data } = await apiFileManager
    .get('file', {
      params
    });

  return data;
};
