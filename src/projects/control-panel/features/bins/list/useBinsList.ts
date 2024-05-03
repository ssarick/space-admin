import { ref } from 'vue';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiBinsController } from '@/projects/control-panel/shared/api';
import { BinsInfo } from '@/projects/control-panel/shared/types/bins.types.ts';

export default function useBinsList() {
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const bins = ref<BinsInfo[]>([]);
  const binsLoading = ref(false);
  const filtersModal = ref(false);

  const fetchBins = async () => {
    binsLoading.value = true;

    const {
      totalPages,
      items
    } = await ApiBinsController.fetchBins({
      page: pageNumber.value - 1,
      size: pageSize.value
    });

    console.log(items);

    bins.value = items || [];
    pageCount.value = totalPages || 0;
    binsLoading.value = false;
  };

  const showModal = () =>
    filtersModal.value = true;

  const closeModal = () =>
    filtersModal.value = false;

  onMounted(fetchBins);

  return {
    bins,
    binsLoading,
    tableRef,
    filtersModal,
    showModal,
    closeModal,
    fetchBins
  };
}
