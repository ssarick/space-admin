import { IResponseData } from '@/shared/types/api.types';
import {
  CertificateState,
  CertificateType,
  ICertificate,
  ICertificateCreationPayload,
  ICertificateRevokingPayload,
  ICertificateStateChangingPayload,
  IInetBankCertificateFetchingPayload,
  IMobileCertificateAttachingPayload,
  IMobileCertificatesFetchingPayload
} from '@/projects/b2b/shared/types/certificate.types';
import api from './instance';

export const fetchInetBankCertificates = async ({
  branch,
  userId,
  ...params
}: IInetBankCertificateFetchingPayload): Promise<
  IResponseData<ICertificate>
> => {
  const { data } = await api.get(
    `/api/branches/${branch}` + `/users/${userId}/inetbank-certificates`,
    { params }
  );

  return data;
};

export const fetchMobileCertificates = async ({
  userId,
  ...params
}: IMobileCertificatesFetchingPayload): Promise<
  IResponseData<ICertificate>
> => {
  const { data } = await api.get(`/api/users/${userId}/mobile-certificates`, {
    params
  });

  return data;
};

export const revokeMobileCertificate = async ({
  certificateSerialNumber,
  reasonText
}: ICertificateRevokingPayload): Promise<IResponseData<string>> => {
  const { data } = await api.delete(
    '/api/mobile-certificates/' + certificateSerialNumber,
    { params: { reason: reasonText } }
  );

  return data;
};

const createMobileCertificate = async ({
  password,
  branch,
  userId,
  businessCode
}: ICertificateCreationPayload): Promise<IResponseData<ICertificate>> => {
  const { data } = await api.post(
    `/api/branches/${branch}` +
      `/businesses/${businessCode}` +
      `/users/${userId}/mobile-certificate`,
    {
      password,
      revokeCertificateReason: null
    }
  );

  return data;
};

const createInetBankCertificate = async ({
  password,
  branch,
  userId,
  businessCode
}: ICertificateCreationPayload): Promise<IResponseData<ICertificate>> => {
  const { data } = await api.post(
    `/api/branches/${branch}` +
      `/businesses/${businessCode}` +
      `/users/${userId}` +
      `/inetbank-certificates/${password}`
  );

  return data;
};

export const createCertificate = async (
  payload: ICertificateCreationPayload
): Promise<IResponseData<ICertificate | null>> => {
  return (
    payload.certificateType === CertificateType.INTER_BANK
      ? createInetBankCertificate
      : createMobileCertificate
  )(payload);
};

export const attachMobileCertificate = async ({
  branch,
  businessCode,
  userId,
  serialNumber
}: IMobileCertificateAttachingPayload): Promise<IResponseData<string>> => {
  const { data } = await api.put(
    `/api/branches/${branch}` +
      `/businesses/${businessCode}` +
      `/users/${userId}` +
      `/mobile-certificates/${serialNumber}`
  );

  return data;
};

export const changeMobileCertificateState = async ({
  certificateSerialNumber,
  certificateState
}: ICertificateStateChangingPayload): Promise<IResponseData<string>> => {
  const { data } = await api.put(
    '/api/mobile-certificates' +
      `/${certificateSerialNumber}/state` +
      `/${certificateState === CertificateState.Blocked ? 0 : 1}`
  );

  return data;
};

export const changeInetBankCertificateState = async ({
  certificateSerialNumber,
  certificateState
}: ICertificateStateChangingPayload): Promise<IResponseData<string>> => {
  const { data } = await api.put(
    '/api/inetbank-certificates' +
      `/${certificateSerialNumber}/state` +
      `/${certificateState === CertificateState.Blocked ? 0 : 1}`
  );

  return data;
};
