import { IFileManageItem } from '@/projects/file-manager/shared/types/file-manage.types';

export interface IFilesManageDetailsProps {
  selectedFile?: IFileManageItem
  downloadLoading?: boolean
}

export interface IFilesManageDetailsEmits {
  (event: 'download')
}
