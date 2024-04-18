import { computed, ref } from 'vue';

export default function useLoading() {
  const loadingCount = ref(0);

  const loading = computed<boolean>({
    get: () => !!loadingCount.value,
    set: (value: boolean) => {
      if (value) {
        loadingCount.value++;
      } else if (loadingCount.value) {
        loadingCount.value--;
      }
    }
  });

  return {
    loading
  };
}
