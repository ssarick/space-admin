import { computed } from 'vue';
import { IResponseData } from '@/shared/types/api.types';
import { IDictionaryCommon, IMfo } from '@/shared/types/common.types';
import {
  ICertificateRevokingReason,
  ICertificateRevokingReasonsFetchingPayload
} from '@/projects/b2b/shared/types/certificate.types';
import { IDocumentType } from '@/projects/b2b/shared/types/document.types';
import {
  IBlockingReason,
  IBlockingReasonParams
} from '@/projects/b2b/shared/types/reason.types';
import { IUserPermission } from '@/projects/b2b/shared/types/user.types';
import api from './instance';

const baseUrl = computed(() => {
  return '/api/dictionaries';
});

export const fetchUserRoles = async (): Promise<
  IResponseData<IUserPermission[]>
> => {
  const { data } = await api.get(`${baseUrl.value}/roles`);

  return data;
};

export const fetchUserActionModules = async (): Promise<
  IResponseData<IUserPermission>
> => {
  const { data } = await api.get(`${baseUrl.value}/action-modules`);

  return data;
};

export const fetchBlockingReasons = async (
  params?: IBlockingReasonParams
): Promise<IResponseData<IBlockingReason>> => {
  const { data } = await api.get(`${baseUrl.value}/blocking-reasons`, {
    params
  });

  return data;
};

export const fetchDocumentTypes = async (): Promise<
  IResponseData<IDocumentType>
> => {
  const { data } = await api.get(`${baseUrl.value}/document-types`);

  return data;
};

export const fetchCertificateRevokingReasons = async ({ certificateType }: ICertificateRevokingReasonsFetchingPayload): Promise<
  IResponseData<ICertificateRevokingReason>
> => {
  const { data } = await api.get(
    '/api/dictionaries/certificate-types' + `/${certificateType}/revoke-reasons`
  );

  return data;
};

export const fetchAdminBlockingReasons = async (): Promise<
  IResponseData<IDictionaryCommon>
> => {
  const { data } = await api
    .get(`${baseUrl.value}/admin-blocking-reasons`);

  return data;
};

export const fetchReportTypes = async (): Promise<
  IResponseData<IDictionaryCommon>
> => {
  const { data } = await api
    .get('/api/dictionaries/report-types');

  return data;
};

export const fetchAdminRoles = async (): Promise<
  IResponseData<IDictionaryCommon>
> => {
  const { data } = await api
    .get('/api/dictionaries/admin-roles');

  return data;
};

export const fetchBranches = async ():
Promise<IResponseData<IMfo>> => {
  const { data } = await api
    .get('/api/dictionaries/branches');

  return data;
};
