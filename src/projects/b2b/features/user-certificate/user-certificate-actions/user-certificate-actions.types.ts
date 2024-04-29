import {
  CertificateState,
  ICertificate
} from '@/projects/b2b/shared/types/certificate.types';

export interface IUserCertificateActionsProps {
  certificate?: ICertificate | null
  certificateState?: CertificateState | null
  certificateRevokedReason?: string | null
  certificateDeactivateDate?: string | null
}

export interface IUserCertificateActionsEmit {
  (
    event: 'update:certificateState',
    value: IUserCertificateActionsProps['certificateState']
  ): void
  (
    event: 'update:certificateRevokedReason',
    value: IUserCertificateActionsProps['certificateRevokedReason']
  ): void
  (
    event: 'update:certificateDeactivateDate',
    value: IUserCertificateActionsProps['certificateDeactivateDate']
  ): void
}
