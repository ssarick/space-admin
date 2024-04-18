import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ApiFileManage } from '../../shared/api';
import { IFileManageBucket } from '../../shared/types/file-manage.types';
import FileManageMapper from '../../shared/utils/mappers/file-manage-mapper';

export const useFileManagerBucketsStore = defineStore(
  'file-manager-buckets',
  () => {
    const buckets = ref<IFileManageBucket[]>([]);
    const loading = ref(false);

    const fetchBuckets = async () => {
      loading.value = true;

      const { items } = await ApiFileManage
        .fetchBuckets();

      buckets.value = FileManageMapper
        .toBuckets(items || []);

      loading.value = false;
    };

    return {
      buckets,
      loading,
      fetchBuckets
    };
  }
);
