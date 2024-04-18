import { onMounted, ref } from 'vue';
import usePagination from '@/shared/composables/usePagination';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiContract } from '@/projects/autopay/shared/api';
import { IContract } from '@/projects/autopay/shared/types/contract.types';

export default function useContractsTable() {
  const tableRef = useTableRef();
  const contractsLoading = ref(false);
  const contracts = ref<IContract[]>([]);

  const {
    pageNumber,
    pageSize,
    pageCount
  } = usePagination(tableRef);

  const fetchContracts = async (search?: string) => {
    if (search) pageNumber.value = 1;

    contractsLoading.value = true;

    const { items, totalPages } = await ApiContract
      .searchContracts({
        contractId: search ? +search : undefined,
        pageNumber: pageNumber.value,
        pageSize: pageSize.value
      });

    contracts.value = items || [];
    pageCount.value = totalPages || 1;
    contractsLoading.value = false;
  };

  onMounted(() => {
    fetchContracts();
  });

  return {
    fetchContracts,
    tableRef,
    contractsLoading,
    contracts
  };
}
