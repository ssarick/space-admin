import { ref, watch } from 'vue';
import { ApiContract } from '@/projects/autopay/shared/api';
import { IContractDetail } from '@/projects/autopay/shared/types/contract.types';
import { IContractDetailProps } from './contract-detail.types';

export default function useContractDetail(
  props: IContractDetailProps
) {
  const contractLoading = ref(false);
  const contractDetail = ref<IContractDetail | null>(null);
  const coborrowers = ref<number[]>([]);

  const fetchCoborrowers = async () => {
    const { items } = await ApiContract
      .fetchCoborrowersByContractId(props.contractId);

    coborrowers.value = items || [];
  };

  const fetchContractDetail = async () => {
    const { item, error } = await ApiContract
      .getContractById(props.contractId);

    if (!error) contractDetail.value = item;
  };

  const fetchContractFull = async () => {
    if (!props.contractId) return;

    contractLoading.value = true;

    await Promise.allSettled([
      fetchCoborrowers(),
      fetchContractDetail()
    ]);

    contractLoading.value = false;
  };

  watch(
    () => props.contractId,
    fetchContractFull,
    { immediate: true }
  );

  return {
    contractLoading,
    contractDetail,
    coborrowers
  };
}
