import type { StatusColor } from '@/shared/types/status.types';
import type { InventoryUser } from '@/projects/inventory/shared/types/users.types';

export interface InventorySession {
  id?: number | null
  name?: string | null
  officeId?: number | null
  officeName?: string | null
  inventoryUserId?: number | null
  inventoryUserFullName?: string | null
  stateId?: number | null
  createdDate?: string | null
}

export interface InventoryTakerUser extends
  Pick<InventoryUser, 'fullName' | 'id' | 'email'> {}

export interface InventoryTakerUsersList extends
  InventorySession {
  users?: InventoryTakerUser[]
}

export interface InventorySelectOptions {
  id: number
  name: string
  fullName: string
  email: string
  phoneNumber: string
}

export interface InventorySessionDetails {
  id?: number | null
  createdDate?: string | null
  stateId?: number | null
  equipmentId?: number | null
  equipmentName?: string | null
  equipmentInventoryNumber?: number | null
}

export interface InventorySessionCreatePayload {
  name?: string | null
  inventoryUserIds?: number[] | null
  officeId?: number | null
}

export interface InventorySessionFormModel extends
  Partial<InventorySessionCreatePayload> {}

export interface InventoryTypeInput {
  id: string | number | boolean
  name: string
  value: string
}

export interface InventoryStatusesOption {
  stateId: number | null
  description?: string
  color?: StatusColor
}
