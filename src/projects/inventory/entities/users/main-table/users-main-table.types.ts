import type { InventoryUser } from '@/projects/inventory/shared/types/users.types';

export interface UsersMainTableProps {
  data?: InventoryUser[]
  loading?: boolean
}
