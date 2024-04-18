import { BindedFace } from '@/projects/binded-face/shared/types/binded-face.types';

export interface BindedFaceTableProps {
  loading?: boolean
  applications?: BindedFace[]
  selectedIds?: number[]
}

export interface BindedFaceTableEmits {
  (
    event: 'update:selectedIds',
    value: BindedFaceTableProps['selectedIds']
  )
  (
    event: 'delete',
    value: number
  )
}
