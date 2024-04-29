import type { InventorySession } from '@/projects/inventory/shared/types/sessions.types';

export interface SessionsConfirmModalProps {
  loading?: boolean
  confirmModal?: boolean
  confirmData?: InventorySession
}

export interface SessionsConfirmModalEmits {
  (
    event: 'handleConfirm',
    value: SubmitEvent
  )
}
