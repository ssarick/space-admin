import { IAdmin } from '@/projects/b2b/shared/types/admin.types';

export interface IAdminTableProps {
  data?: IAdmin[]
  loading?: boolean
}

export interface IAdminTableEmits {
  (event: 'delete', value: number)
}
