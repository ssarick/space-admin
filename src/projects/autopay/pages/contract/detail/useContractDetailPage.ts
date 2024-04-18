import { computed } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';

export default function useContractDetailPage() {
  const route = useRoute();

  const contractId = computed<number>(() =>
    +(route.params.id || 0));

  const prevRoute: RouteLocationRaw = {
    name: 'contract-list'
  };

  return {
    contractId,
    prevRoute
  };
}
