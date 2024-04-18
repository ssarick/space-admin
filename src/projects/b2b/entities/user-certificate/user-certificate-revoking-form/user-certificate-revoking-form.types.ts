import {
  ICertificate,
  ICertificateRevokingReasonFormModel
} from '@/projects/b2b/shared/types/certificate.types';

export interface IUserCertificateRevokingFormProps
  extends ICertificateRevokingReasonFormModel {
  disabled?: boolean;
  certificate?: ICertificate | null;
  model: ICertificateRevokingReasonFormModel;
}

export interface IUserCertificateRevokingFormEmit {
  (
    event: 'update:reasonId',
    value: IUserCertificateRevokingFormProps['reasonId']
  ): void;
  (
    event: 'update:reasonText',
    value: IUserCertificateRevokingFormProps['reasonText']
  ): void;
  (
    event: 'update:customReasonText',
    value: IUserCertificateRevokingFormProps['customReasonText']
  ): void;
  (
    event: 'update:hasCustomReasonText',
    value: IUserCertificateRevokingFormProps['hasCustomReasonText']
  ): void;
}
