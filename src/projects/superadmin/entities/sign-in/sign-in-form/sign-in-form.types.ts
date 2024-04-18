import { ISignInFormModel } from '@/shared/types/auth.types';

export interface ISignInFormProps extends
  ISignInFormModel {
  model: ISignInFormModel
  loading?: boolean
}

export interface ISignInFormEmit {
  (
    event: 'update:username',
    value: string
  ): void
  (
    event: 'update:password',
    value: string
  ): void
  (
    event: 'update:rememberMe',
    value: boolean
  ): void
}
