import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDate } from '@/shared/utils/functions/date';
import { BinsInfo } from '@/projects/control-panel/shared/types/bins.types';

export default function useTerminalsMainTable() {
  const { t } = useI18n();
  const tableRef = useTableRef();
  const router = useRouter();

  const columns = computed<
    DataTableColumns<BinsInfo>
  >(
    () => [
      {
        title: t('terminalId'),
        key: 'terminalId'
      },
      {
        title: t('merchantId'),
        key: 'merchantId'
      },
      {
        title: t('Name2'),
        key: 'name'
      },
      {
        title: t('operationType'),
        key: 'operationType'
      },
      {
        title: t('partner'),
        key: 'partner'
      },
      {
        title: t('Data-of-creation'),
        align: 'left',
        key: 'createdDate',
        render: (row: BinsInfo) => formatDate(
          row.createdDate
        )
      }
    ]);

  const rowProps = (row: BinsInfo) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => {
        router.push({
          name: 'inventory-users-info',
          params: {
            userId: row.terminalId
          }
        });
      }
    };
  };

  const rowKey = (row: BinsInfo) => row.terminalId;

  return {
    columns,
    rowKey,
    tableRef,
    rowProps
  };
}
