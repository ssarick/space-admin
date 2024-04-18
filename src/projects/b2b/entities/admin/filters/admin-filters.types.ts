import { IDictionaryCommon } from '@/shared/types/common.types';

export interface IAdminFiltersProps {
  fio?: string | null
  phone?: string | null
  login?: string | null
  roleId?: number | null
  roles?: IDictionaryCommon[] | null
  rolesLoading?: boolean
}

export interface IAdminFiltersEmits {
  (
    event: 'update:fio',
    value: IAdminFiltersProps['fio']
  )
  (
    event: 'update:phone',
    value: IAdminFiltersProps['phone']
  )
  (
    event: 'update:login',
    value: IAdminFiltersProps['login']
  )
  (
    event: 'update:roleId',
    value: IAdminFiltersProps['roleId']
  )
}
