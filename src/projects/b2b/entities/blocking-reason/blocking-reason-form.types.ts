import {
  IBlockingReasonParams,
  IReasonFormModel
} from '@/projects/b2b/shared/types/reason.types';

export interface IBlockingReasonFormProps extends IReasonFormModel {
  model: IReasonFormModel;
  disabled?: boolean;
  reasonText?: string;
  params?: IBlockingReasonParams;
}

export interface IBlockingReasonFormEmits {
  (event: 'update:reasonText', value?: string): void;
  (event: 'update:reasonId', value?: number | null): void;
}
