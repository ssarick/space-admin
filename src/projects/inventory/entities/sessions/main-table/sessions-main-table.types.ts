import type { InventorySession } from '@/projects/inventory/shared/types/sessions.types';

export interface SessionsMainTableProps {
  data?: InventorySession[]
  loading?: boolean
}
export interface SessionsMainTableEmits {
  (
    event: 'confirmModalShow',
    value: boolean
  )
  (
    event: 'confirmModalData',
    value: InventorySession
  )
}
