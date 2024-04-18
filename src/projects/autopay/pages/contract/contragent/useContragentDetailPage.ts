import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default function useContragentDetailPage() {
  const route = useRoute();

  const contragentId = computed<number>(() =>
    +(route.params.id || 0));

  return {
    contragentId
  };
}
