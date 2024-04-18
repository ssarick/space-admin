import { reactive, ref } from 'vue';
import { EntityClient, EntityFilters } from '../../shared/types/entity.types';

export default function useEntitySearch() {
  const massSearchModalIsActive = ref(false);

  const filters = reactive<EntityFilters>({
    openDate: null,
    name: null,
    pinfl: null
  });

  const entityClients = ref<EntityClient[]>(
    Array
      .from({ length: 10 })
      .fill(undefined)
      .map(() => ({
        name: 'ISLAM YUSUBOV CHP',
        clientCode: '00256487',
        closeDate: '13.08.2023',
        inn: '51658461',
        mfo: '013923',
        openDate: '12.08.2023',
        state: 'Успешно'
      }))
  );

  const onToggleMassSearchModal = () => {
    massSearchModalIsActive.value = !massSearchModalIsActive.value;
  };

  return {
    entityClients,
    filters,
    massSearchModalIsActive,
    onToggleMassSearchModal
  };
}
