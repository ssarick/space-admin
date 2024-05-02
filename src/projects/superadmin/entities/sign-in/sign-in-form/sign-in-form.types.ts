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
  )
  (
    event: 'update:password',
    value: string
  )
  (
    event: 'update:rememberMe',
    value: boolean
  )
  (
    event: 'showRegister',
    value: boolean
  )
}
