import type {
  InventorySessionDetails,
  InventoryStatusesOption
} from '@/projects/inventory/shared/types/sessions.types';

export interface SessionInfoTableProps {
  data?: InventorySessionDetails[]
  loading?: boolean,
  sessionStatusesList?: InventoryStatusesOption[]
}
