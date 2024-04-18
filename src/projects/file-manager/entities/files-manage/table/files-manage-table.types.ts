import { FileManageEntity } from '@/projects/file-manager/shared/types/file-manage.types';

export interface IFilesManageTableProps {
  data?: FileManageEntity[]
  loading?: boolean
  hideTable?: boolean
}

export interface IFilesManageTableEmits {
  (
    event: 'select',
    value: FileManageEntity
  )
}
