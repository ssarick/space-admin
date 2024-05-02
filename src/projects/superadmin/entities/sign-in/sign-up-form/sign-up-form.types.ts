import { ISignUpParams } from '@/shared/types/auth.types';

export interface ISignUpFormProps extends
  ISignUpParams {
  model: ISignUpParams
  loading?: boolean
}

export interface ISignUpFormEmit {
  (
    event: 'update:username',
    value: string
  )
  (
    event: 'update:password',
    value: string
  )
  (
    event: 'showRegister',
    value: boolean
  )
}
