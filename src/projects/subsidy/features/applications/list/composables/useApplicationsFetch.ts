import { onMounted, reactive, ref } from 'vue';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplicationFiltersModel, SubsidyApplicationInternal } from '@/projects/subsidy/shared/types/application.types';
import SubsidyInternalApplicationsMapper from '../mappers/internal-applications-mapper';

export default function useApplicationsFetch() {
  const applicationsLoading = ref(false);
  const applications = ref<SubsidyApplicationInternal[]>([]);
  const tableRef = useTableRef();
  const filtersModalIsActive = ref(false);
  const selectedApplicationIds = ref<number[]>([]);

  const filtersModel = reactive<SubsidyApplicationFiltersModel>({
    accExternal: null,
    amountPayableTiyinFrom: null,
    amountPayableTiyinTo: null,
    minfinStatus: null,
    paymentDayFrom: null,
    paymentDayTo: null,
    pinfl: null,
    status: null
  });

  const {
    pageNumber,
    pageSize,
    pageCount,
    resetPagination
  } = usePagination(tableRef);

  const fetchApplications = async () => {
    applicationsLoading.value = true;

    const { items, totalPages } = await ApiSubsidyApplication
      .fetchApplications({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        ...SubsidyInternalApplicationsMapper
          .toFilters(filtersModel)
      });

    applications.value = SubsidyInternalApplicationsMapper
      .toInternalList(items);

    pageCount.value = totalPages || 1;
    applicationsLoading.value = false;
  };

  const showFiltersModal = () => {
    filtersModalIsActive.value = true;
  };

  const resetFilters = () => {
    for (const key in filtersModel) {
      filtersModel[key] = null;
    }

    resetPagination();
  };

  onMounted(fetchApplications);

  return {
    filtersModel,
    applicationsLoading,
    applications,
    tableRef,
    filtersModalIsActive,
    fetchApplications,
    showFiltersModal,
    resetFilters,
    selectedApplicationIds
  };
}
