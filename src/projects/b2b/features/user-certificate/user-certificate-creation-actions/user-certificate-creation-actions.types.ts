import { ICertificate } from '@/projects/b2b/shared/types/certificate.types';

export interface IUserCertificateCreationActionProps {
  certificates: ICertificate[];
  maxCount?: number;
  isMobileCertificate?: boolean;
}

export interface IUserCertificateCreationActionEmit {
  (
    event: 'unshiftCertificate',
    value: ICertificate
  )
  (
    event: 'popCertificate'
  )
  (
    event: 'update:isMobileCertificate',
    value: boolean
  )
}
