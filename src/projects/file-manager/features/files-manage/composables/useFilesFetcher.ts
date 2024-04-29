import { ref } from 'vue';
import { usePagination } from '@/shared/composables';
import { IPagination } from '@/shared/types/pagination.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { isFilledObject } from '@/shared/utils/functions/object';
import NumberUtils from '@/shared/utils/number';
import { ApiFileManage } from '@/projects/file-manager/shared/api';
import {
  FileManageEntity,
  FileManageEntityType,
  IFileManageFilterUtilsForFetcher,
  IFileManageGeneralEntity
} from '@/projects/file-manager/shared/types/file-manage.types';
import FileManageMapper from '@/projects/file-manager/shared/utils/mappers/file-manage-mapper';

export default function useFilesFetcher(
  filterUtils: IFileManageFilterUtilsForFetcher
) {
  const entities = ref<FileManageEntity[]>([]);
  const loading = ref(false);
  const tableRef = useTableRef();

  const {
    pageCount,
    pageNumber,
    pageSize,
    resetPagination
  } = usePagination(tableRef);

  const getFiltersWithPagination = <T extends object>(
    filters: T
  ): T & IPagination => ({
    ...filters,
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  });

  const setFolderExpanded = (
    folder: IFileManageGeneralEntity<
      FileManageEntityType.FOLDER
    >,
    expanded: boolean
  ) => {
    folder.expanded = expanded;
    folder.key = NumberUtils.uniqueString;
  };

  const fetchFiles = async () => {
    loading.value = true;

    const { items, totalPages } = await ApiFileManage
      .fetchFiles(
        getFiltersWithPagination(
          filterUtils.getFilesFilters()
        )
      );

    entities.value = FileManageMapper
      .filesToEntities(items);

    pageCount.value = totalPages;
    loading.value = false;
  };

  const fetchFolderFiles = async (
    folder: IFileManageGeneralEntity<
      FileManageEntityType.FOLDER
    >
  ) => {
    folder.loading = true;

    const { items } = await ApiFileManage
      .fetchFiles(
        filterUtils.getFolderFilesFilters(folder)
      );

    folder.children = FileManageMapper
      .filesToEntities(items);

    folder.loading = false;
  };

  const checkStatesAndFetchFolderFiles = async (
    folder: IFileManageGeneralEntity<
      FileManageEntityType.FOLDER
    >
  ) => {
    if (folder.loading) return;

    if (folder.expanded)
      return setFolderExpanded(folder, false);

    await fetchFolderFiles(folder);
    setFolderExpanded(folder, true);
  };

  const fetchFolders = async () => {
    loading.value = true;

    const { items, totalPages } = await ApiFileManage
      .fetchFolders(
        getFiltersWithPagination(
          filterUtils.getFoldersFilters()
        )
      );

    entities.value = FileManageMapper
      .foldersToEntities(items);

    pageCount.value = totalPages;
    loading.value = false;
  };

  const fetchEntities = async () => {
    if (isFilledObject(
      filterUtils.filtersModel, 'bucketId'))
      return await fetchFiles();

    if (filterUtils.filtersModel.bucketId)
      await fetchFolders();
    else
      entities.value = [];
  };

  const resetPaginationAndFetchEntities = async () => {
    resetPagination();
    await fetchEntities();
  };

  return {
    entities,
    loading,
    fetchFiles,
    tableRef,
    fetchFolders,
    fetchEntities,
    fetchFolderFiles,
    resetPagination,
    resetPaginationAndFetchEntities,
    checkStatesAndFetchFolderFiles
  };
}
