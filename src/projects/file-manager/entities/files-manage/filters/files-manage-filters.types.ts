import { ISelectOption } from '@/shared/types/select.types';
import { IFileManageFiltersFormModel } from '@/projects/file-manager/shared/types/file-manage.types';

export interface IFilesManageFilersProps extends
  IFileManageFiltersFormModel {
  signFactOptions?: ISelectOption[]
}

export interface IFilesManageFiltersEmits {
  (
    event: 'update:uploadDate',
    value: IFilesManageFilersProps['uploadDate']
  )
  (
    event: 'update:updatedDate',
    value: IFilesManageFilersProps['updatedDate']
  )
  (
    event: 'update:signFact',
    value: IFilesManageFilersProps['signFact']
  )
}
