import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CustomBoolean } from '@/shared/types/common.types';
import { ISelectOption } from '@/shared/types/select.types';
import { isFilledObject } from '@/shared/utils/functions/object';
import { FileManageEntity, FileManageEntityType, IFileManageItem } from '../../shared/types/file-manage.types';
import { useFileManagerBucketsStore } from '../../app/store/useFileManagerBucketsStore';
import useFilesDownloader from './composables/useFilesDownloader';
import useFilesFetcher from './composables/useFilesFetcher';
import useFilesFilters from './composables/useFilesFilters';

export default function useFilesManage() {
  const selectedFile = ref<IFileManageItem | null>(null);
  const route = useRoute();
  const { buckets } = useFileManagerBucketsStore();

  const bucketId = computed<string>(
    () => String(route.params.bucket || '')
  );

  const bucketName = computed<string>(
    () => buckets
      .find(item => item.name === bucketId.value)
      ?.name || ''
  );

  const filesFilters = useFilesFilters();
  const filesFetcher = useFilesFetcher(filesFilters);
  const fileDownloader = useFilesDownloader(selectedFile);

  const signFactOptions = computed<ISelectOption[]>(
    () => [
      {
        label: 'Имеется',
        value: CustomBoolean.YES
      },
      {
        label: 'Не имеется',
        value: CustomBoolean.NO
      }
    ]
  );

  const hideEntitiesTable = computed<boolean>(
    () => !isFilledObject(filesFilters.filtersModel)
  );

  const onSelectEntity = (
    entity: FileManageEntity
  ) => {
    if (entity?.type === FileManageEntityType.FILE)
      selectedFile.value = entity.data || null;
    else
      filesFetcher.checkStatesAndFetchFolderFiles(entity);
  };

  const onUpdateTable = async (
    search?: string | null
  ) => {
    if (search !== undefined)
      filesFilters.filtersModel.search = search;
    else
      filesFetcher.fetchEntities();
  };

  const onChangeBucketRoute = () => {
    filesFetcher.resetPagination();

    for (const key in filesFilters.filtersModel)
      filesFilters.filtersModel[key] = null;

    filesFilters.filtersModel.bucketId = bucketId.value;
  };

  watch(
    () => filesFilters.filtersModel,
    filesFetcher.resetPaginationAndFetchEntities,
    { deep: true }
  );

  watch(
    bucketId,
    onChangeBucketRoute,
    { immediate: true }
  );

  return {
    ...filesFetcher,
    ...fileDownloader,
    ...filesFilters,
    bucketName,
    signFactOptions,
    selectedFile,
    hideEntitiesTable,
    onSelectEntity,
    onUpdateTable
  };
}
