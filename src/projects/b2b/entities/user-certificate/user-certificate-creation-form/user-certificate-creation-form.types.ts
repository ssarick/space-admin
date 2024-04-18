import { ICertificateTypeAndSerialFormModel } from '@/projects/b2b/shared/types/certificate.types';

export interface IUserCertificateCreationFormProps
  extends ICertificateTypeAndSerialFormModel {
  model: ICertificateTypeAndSerialFormModel;
  disabled?: boolean;
}

export interface IUserCertificateCreationFormEmit {
  (
    event: 'update:certificateType',
    value: IUserCertificateCreationFormProps['certificateType']
  ): void;
  (
    event: 'update:certificateSerial',
    value: IUserCertificateCreationFormProps['certificateSerial']
  ): void;
}
