import type { InventoryUserFormModel } from '@/projects/inventory/shared/types/users.types';

export interface UserFormProps extends
  InventoryUserFormModel {
  model?: InventoryUserFormModel
  loading?: boolean
  submitLocale?: string
}

export interface UserFormEmits {
  (
    event: 'update:fullName',
    value: UserFormProps['fullName']
  )
  (
    event: 'update:phoneNumber',
    value: UserFormProps['phoneNumber']
  )
  (
    event: 'update:userName',
    value: UserFormProps['userName']
  )
  (
    event: 'update:password',
    value: UserFormProps['password']
  )
  (
    event: 'update:email',
    value: UserFormProps['email']
  )
}
