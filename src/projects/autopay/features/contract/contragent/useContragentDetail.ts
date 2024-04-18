import { ref, watch } from 'vue';
import { ApiContract } from '@/projects/autopay/shared/api';
import { IContragent } from '@/projects/autopay/shared/types/contract.types';
import { IContragentDetailProps } from './contragent-detail.types';

export default function useContragentDetail(
  props: IContragentDetailProps
) {
  const contragentLoading = ref(false);
  const contragent = ref<IContragent | null>(null);

  const fetchContragentDetail = async () => {
    contragentLoading.value = true;

    const { item, error } = await ApiContract
      .getContragentById(props.contragentId);

    if (!error) contragent.value = item;

    contragentLoading.value = false;
  };

  watch(
    () => props.contragentId,
    fetchContragentDetail,
    { immediate: true }
  );

  return {
    contragent,
    contragentLoading
  };
}
