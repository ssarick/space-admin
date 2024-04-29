import { reactive, ref } from 'vue';
import { IndividualClient, IndividualFiltersModel } from '../../shared/types/individual.types';

export default function useIndividualSearch() {
  const massSearchModalIsActive = ref(false);

  const filters = reactive<IndividualFiltersModel>({
    birthDate: null,
    cutFio: null,
    name: null,
    pinfl: null
  });

  const individualClients = ref<IndividualClient[]>(
    Array
      .from({
        length: 10
      })
      .fill(undefined)
      .map(() => ({
        name: 'Гребенюк Владимир Дмитриевич',
        account: '2023929329391235933',
        address: 'Г. Ташкент, Яшнободский район',
        branch: 'Тошкент ш., “КАПИТАОБАНК”',
        branchCode: '19293',
        rp: '2000'
      }))
  );

  const onToggleMassSearchModal = () => {
    massSearchModalIsActive.value = !massSearchModalIsActive.value;
  };

  return {
    individualClients,
    filters,
    massSearchModalIsActive,
    onToggleMassSearchModal
  };
}
