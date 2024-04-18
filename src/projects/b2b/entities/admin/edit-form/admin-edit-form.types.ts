import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export interface IAdminEditFormProps {
  data?: IAdmin | null
  isEdit?: boolean
  adminIsBlocked?: boolean
  admin?: IAdmin | null
  branch?: string | null
  fio?: string | null
  login?: string | null
  phone?: string | null
  email?: string | null
  roleId?: number | null
}

export interface IAdminEditFormEmits {
  (
    event: 'update:fio',
    value: IAdminEditFormProps['fio']
  )
  (
    event: 'update:email',
    value: IAdminEditFormProps['email']
  )
  (
    event: 'update:phone',
    value: IAdminEditFormProps['phone']
  )
  (
    event: 'update:login',
    value: IAdminEditFormProps['login']
  )
  (
    event: 'update:branch',
    value: IAdminEditFormProps['branch']
  )
  (
    event: 'update:roleId',
    value: IAdminEditFormProps['roleId']
  )
}
