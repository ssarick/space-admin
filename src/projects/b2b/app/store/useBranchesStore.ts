import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IMfo } from '@/shared/types/common.types';
import { ApiDictionary } from '@/projects/b2b/shared/api';

export const useBranchesStore = defineStore(
  'branches',
  () => {
    const branches = ref<IMfo[]>([]);
    const branchesLoading = ref(false);

    const fetchBranches = async () => {
      branchesLoading.value = true;

      const { items } = await ApiDictionary
        .fetchBranches();

      branches.value = items || [];
      branchesLoading.value = false;
    };

    return {
      branches,
      branchesLoading,
      fetchBranches
    };
  }
);
