import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCommonStore = defineStore(
  'common',
  () => {
    const contentKey = ref(0);

    const resetAppContent = () =>
      contentKey.value++;

    return {
      contentKey,
      resetAppContent
    };
  }
);
