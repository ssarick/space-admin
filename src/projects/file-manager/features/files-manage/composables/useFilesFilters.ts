import { reactive } from 'vue';
import { transformCustomBoolean } from '@/shared/utils/functions';
import { formatDateToISO } from '@/shared/utils/functions/date';
import { isEmptyValue } from '@/shared/utils/functions/object';
import {
  FileManageEntityType,
  FileManageFilterKey,
  FileManageFilterOperation,
  FileManageSortType,
  IFileManageFetchPayload,
  IFileManageFilterCriteria,
  IFileManageFilters,
  IFileManageFilterUtils,
  IFileManageFolderPayload,
  IFileManageGeneralEntity
} from '@/projects/file-manager/shared/types/file-manage.types';

export default function useFilesFilters(): IFileManageFilterUtils {
  const filtersModel = reactive<IFileManageFilters>({
    uploadDate: null,
    updatedDate: null,
    signFact: null,
    search: null,
    bucketId: null
  });

  const getFoldersFilters = (): IFileManageFolderPayload => ({
    bucketId: filtersModel.bucketId || '',
    sort: 'folder',
    'name.dir': FileManageSortType.desc
  });

  const prepareFiltersCriteria = (
    list: IFileManageFilterCriteria[]
  ): IFileManageFilterCriteria[] => {
    const result: IFileManageFilterCriteria[] = [];

    list.forEach(item => isEmptyValue(item.value)
      || result.push({
        ...item,
        value: String(item.value)
      }));

    return result;
  };

  const getFilesFilters = (): IFileManageFetchPayload => ({
    searchCriteria: prepareFiltersCriteria([
      {
        key: FileManageFilterKey.createdAt,
        value: filtersModel.uploadDate
          && formatDateToISO(
            filtersModel.uploadDate
          ),
        operation: FileManageFilterOperation.eq
      },
      {
        key: FileManageFilterKey.updatedAt,
        value: filtersModel.updatedDate
          && formatDateToISO(
            filtersModel.updatedDate
          ),
        operation: FileManageFilterOperation.eq
      },
      {
        key: FileManageFilterKey.filename,
        value: filtersModel.search,
        operation: FileManageFilterOperation.cn
      },
      {
        key: FileManageFilterKey.signed,
        value: transformCustomBoolean(
          filtersModel.signFact
        ),
        operation: FileManageFilterOperation.eq
      },
      {
        key: FileManageFilterKey.bucket,
        value: getFoldersFilters().bucketId,
        operation: FileManageFilterOperation.eq
      }
    ])
  });

  const getFolderFilesFilters = (
    folder: IFileManageGeneralEntity<
      FileManageEntityType.FOLDER
    >
  ): IFileManageFetchPayload => ({
    searchCriteria: [
      {
        key: FileManageFilterKey.folder,
        value: folder.id,
        operation: FileManageFilterOperation.eq
      }
    ],
    pageNumber: 1,
    pageSize: 1000
  });

  return {
    filtersModel,
    getFilesFilters,
    getFoldersFilters,
    getFolderFilesFilters
  };
}
