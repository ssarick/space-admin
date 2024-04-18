import { SubsidyApplication } from '@/projects/subsidy/shared/types/application.types';

export interface ApplicationsTableProps {
  loading?: boolean
  applications?: SubsidyApplication[]
  selectedIds?: number[]
}

export interface ApplicationsTableEmits {
  (
    event: 'update:selectedIds',
    value: ApplicationsTableProps['selectedIds']
  )
  (
    event: 'delete',
    value: number
  )
}
