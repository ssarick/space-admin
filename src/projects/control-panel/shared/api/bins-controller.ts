import type { IResponseData } from '@/shared/types/api.types';
import apiControlPanel from '@/projects/control-panel/shared/api/instance';
import {
  BinsInfo,
  BinsInfoCreatePayload,
  BinsInfoPaginationPayload
} from '@/projects/control-panel/shared/types/bins.types';

export const fetchBins = async (
  { ...params }: BinsInfoPaginationPayload
): Promise<IResponseData<BinsInfo>> => {
  const { data } = await apiControlPanel
    .get(
      'v1/admin/bin/page',
      {
        params
      }
    );

  return data;
};

export const createBin = async (
  params: BinsInfoCreatePayload
): Promise<IResponseData<BinsInfo>> => {
  const { data } = await apiControlPanel
    .put(
      '/v1/admin/bin',
      params
    );

  return data;
};

export const updateBin = async (
  params: BinsInfoCreatePayload,
  binId: BinsInfo['id']
): Promise<IResponseData<BinsInfo>> => {
  const { data } = await apiControlPanel
    .post(
      `/v1/admin/bin/${binId}`,
      params
    );

  return data;
};

export const deleteBin = async (
  binId: BinsInfo['id']
): Promise<IResponseData<BinsInfo>> => {
  const { data } = await apiControlPanel
    .delete(
      `/v1/admin/bin/${binId}`
    );

  return data;
};
