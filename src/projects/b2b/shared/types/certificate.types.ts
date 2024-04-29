import { IPagination } from '@/shared/types/pagination.types';
import { UserStateId } from './user.types';

export enum CertificateType {
  INTER_BANK = 2,
  MOBILE_BANK = 3
}

export enum CertificateState {
  Blocked = 'Blocked',
  Active = 'Active',
  Revoked = 'Revoked',
  Lost = 'Lost'
}

export interface ICertificate {
  userId?: number | null
  userLogin?: string | null
  userClientId?: number | null
  userClientState?: UserStateId
  clientId?: number | null
  clientCode?: string | null
  clientName?: string | null
  clientInn?: string | null
  clientState?: UserStateId
  clientBranch?: string | null
  certificateAnswerId?: number | null
  certificateSerialNumber?: string | null
  certificateActivateDate?: string | null
  certificateDeactivateDate?: string | null
  certificateState?: CertificateState | null
  certificateType?: CertificateType
  certificateRevokedReason?: string | null
}

export interface IInetBankCertificateFetchingPayload extends IPagination {
  branch: string
  userId: string
}

export interface IMobileCertificatesFetchingPayload
  extends IPagination,
  Pick<IInetBankCertificateFetchingPayload, 'userId'> {}

export interface ICertificateRevokingPayload
  extends Pick<ICertificate, 'certificateSerialNumber'> {
  reasonId?: number
  reasonText?: string
}

export interface ICertificateRevokingReason {
  id: number | null
  name: string | null
  isNeedWriteReason: boolean | null
}

export interface IMobileCertificateAttachingPayload
  extends Pick<IInetBankCertificateFetchingPayload, 'branch' | 'userId'> {
  businessCode: string
  serialNumber: string
}

export interface ICertificateCreationPayload
  extends Pick<ICertificate, 'certificateType'>,
  Pick<
    IMobileCertificateAttachingPayload,
      'branch' | 'userId' | 'businessCode'
  > {
  password: string
}

export interface ICertificateRevokingReasonsFetchingPayload
  extends Pick<ICertificate, 'certificateType'> {}

export interface ICertificateItemFetchingPayload
  extends IMobileCertificateAttachingPayload {}

export interface ICertificateStateChangingPayload
  extends Pick<ICertificate, 'certificateState'
  | 'certificateSerialNumber'
  | 'certificateAnswerId'> {}

export interface ICertificateRevokingReasonFormModel
  extends Required<Pick<ICertificateRevokingPayload, 'reasonText'>> {
  reasonId: number | null
  hasCustomReasonText: boolean
  customReasonText: string
}

export interface ICertificateTypeAndSerial {
  certificateType: CertificateType
  certificateSerial: string
}

export interface ICertificateTypeAndSerialFormModel
  extends ICertificateTypeAndSerial {}
