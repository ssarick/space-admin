import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { DataTableColumn } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { IContract } from '@/projects/autopay/shared/types/contract.types';
import { IContractsTableEmit } from './contracts-table.types';

export default function useContractsTable(
  emit: IContractsTableEmit
) {
  const { t } = useI18n();
  const router = useRouter();
  const tableRef = useTableRef();

  const columns = computed<DataTableColumn<IContract>[]>(() => [
    {
      title: t('ID'),
      key: 'id'
    }
  ]);

  const rowKey = (row: IContract) => row.id;

  const rowClick = (row: IContract) => router.push({
    name: 'contract-detail',
    params: {
      id: row.id?.toString()
    }
  });

  const onUpdatePagination = () => emit(
    'updatePagination'
  );

  return {
    tableRef,
    columns,
    rowKey,
    rowClick,
    onUpdatePagination
  };
}
