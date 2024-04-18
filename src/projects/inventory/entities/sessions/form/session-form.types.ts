import type { ISelectOption, ISelectResponseData } from '@/shared/types/select.types';
import type {
  InventorySessionFormModel
} from '@/projects/inventory/shared/types/sessions.types';

export interface SessionFormProps extends
  InventorySessionFormModel {
  model?: InventorySessionFormModel
  loading?: boolean
  officeOptions?: ISelectOption[]
  requestUsersOptions?: () => Promise<
    ISelectResponseData
  >
}

export interface SessionFormEmits {
  (
    event: 'update:name',
    value: SessionFormProps['name']
  )
  (
    event: 'update:officeId',
    value: SessionFormProps['officeId']
  )
  (
    event: 'update:inventoryUserIds',
    value: SessionFormProps['inventoryUserIds']
  )
}
