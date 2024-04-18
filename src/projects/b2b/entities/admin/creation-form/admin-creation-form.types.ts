import { IAdminCreationFormModel } from '@/projects/b2b/shared/types/admin.types';

export interface IAdminCreationFormProps extends
  Partial<IAdminCreationFormModel> {
  data?: Partial<IAdminCreationFormModel>
  loading?: boolean
}

export interface IAdminCreationFormEmits {
  (
    event: 'update:login',
    value: IAdminCreationFormProps['login']
  )
  (
    event: 'update:branch',
    value: IAdminCreationFormProps['branch']
  )
  (
    event: 'update:email',
    value: IAdminCreationFormProps['email']
  )
  (
    event: 'update:phone',
    value: IAdminCreationFormProps['phone']
  )
  (
    event: 'update:fio',
    value: IAdminCreationFormProps['fio']
  )
  (
    event: 'update:roleId',
    value: IAdminCreationFormProps['roleId']
  )
}
