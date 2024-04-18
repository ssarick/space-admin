import {
  CertificateState,
  ICertificate
} from '@/projects/b2b/shared/types/certificate.types';

export type CertificateStateTextMap = {
  [P in CertificateState]: string;
};

export interface IUserCertificateFullTableProps {
  selectedCertificate?: ICertificate | null;
  selectable?: boolean;
  visibleKeys?: string[];
  certificates: ICertificate[];
  title?: string;
  hideSwitch?: boolean;
  isMobileCertificates?: boolean;
}

export interface IUserCertificateFullTableEmit {
  (event: 'update:selectedCertificate', value?: ICertificate | null): void;
  (event: 'update:certificates', value: ICertificate[]): void;
  (event: 'update:isMobileCertificates', value?: boolean): void;
}
