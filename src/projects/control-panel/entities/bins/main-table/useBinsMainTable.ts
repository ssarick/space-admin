import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BinsInfo } from '@/projects/control-panel/shared/types/bins.types';

export default function useTerminalsMainTable() {
  const { t } = useI18n();
  const tableRef = useTableRef();
  // const router = useRouter();

  const columns = computed<
    DataTableColumns<BinsInfo>
  >(
    () => [
      {
        title: t('id'),
        key: 'id'
      },
      {
        title: t('bankId'),
        key: 'bankId'
      },
      {
        title: t('cardBin'),
        key: 'cardBin'
      },
      {
        title: t('processing'),
        key: 'processing'
      },
      {
        title: t('legalType'),
        key: 'legalType'
      },
      {
        title: t('cardType'),
        key: 'cardType'
      },
      {
        title: t('processingBankId'),
        key: 'processingBankId'
      },
      {
        title: t('processingBinCentreId'),
        key: 'processingBinCentreId'
      }
      // {
      //   title: t('Data-of-creation'),
      //   align: 'left',
      //   key: 'createdDate',
      //   render: (row: BinsInfo) => formatDate(
      //     row.createdDate
      //   )
      // }
    ]);

  const rowProps = (row: BinsInfo) => {
    return {
      style: 'cursor: pointer',
      ondblclick: () => {
        console.log(row.id);
      }
    };
  };

  const rowKey = (row: BinsInfo) => row.id;

  return {
    columns,
    rowKey,
    tableRef,
    rowProps
  };
}
