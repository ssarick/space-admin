import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumn, NButton } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDateToLocaleWithTime } from '@/shared/utils/functions/date';
import {
  ITransactionManualListTableEmits
} from '@/projects/autopay/entities/transaction/transactions-manual-list/transaction-manual-list.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { ITransaction, TransactionStatus } from '@/projects/autopay/shared/types/transaction.types';

export default function useTransactionManualList(
  emit: ITransactionManualListTableEmits
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const disableCancelForProcessings: ProcessingType[] = [
    ProcessingType.ABS
  ];

  const columns = computed<DataTableColumn<ITransaction>[]>(() => [
    {
      title: 'ID',
      key: 'id',
      render: (row: ITransaction) =>
        row.id || ''
    },
    {
      title: t('Contract ID'),
      key: 'contractId',
      render: (row: ITransaction) =>
        row.contractId || ''
    },
    {
      title: t('Borrower ID'),
      key: 'cardHolderId',
      render: (row: ITransaction) =>
        row.cardHolderId || ''
    },
    {
      title: t('Borrower Full Name'),
      key: 'borrowerName',
      width: 190,
      render: (row: ITransaction) =>
        `${row.borrowerName || ''} ${row.borrowerSurname || ''}`
    },
    {
      title: 'ФИО кардхолдера',
      key: 'cardHolderName',
      width: 190,
      render: (row: ITransaction) =>
        `${row.cardHolderName || ''} ${row.cardHolderSurname || ''}`
    },
    {
      title: t('Amount'),
      key: 'amount',
      render: (row: ITransaction) => AmountFormatter
        .divideAndFormat(row.amount, 'UZS')
    },
    {
      title: t('Status'),
      key: 'status',
      render: (row: ITransaction) =>
        row.status || ''
    },
    {
      title: t('Source'),
      key: 'processingType',
      render: (row: ITransaction) =>
        row.processingType || ''
    },
    {
      title: t('Last numbers'),
      key: 'panMasked',
      width: 150,
      render: (row: ITransaction) =>
        row.panMasked || ''
    },
    {
      title: t('Transaction Date'),
      key: 'transactionTime',
      width: 160,
      render: (row: ITransaction) =>
        formatDateToLocaleWithTime(row.transactionTime) || ''
    },
    {
      title: t('АБС B2'),
      key: 'b2Completed',
      render: (row: ITransaction) =>
        row.b2Completed ? t('Yes') : t('No')
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (row: ITransaction) => h(
        NButton,
        {
          onClick: (e) => {
            e.stopPropagation();
            deleteTransaction(row);
          },
          style: {
            fontWeight: 500
          },
          disabled: row.status !== TransactionStatus.PERFORMED
            || disableCancelForProcessings
              .includes(row.processingType),
          class: 'px-1',
          type: 'error',
          size: 'small',
          tertiary: true
        },
        () => h('span', null, 'Отменить')
      )
    }
  ]);

  const rowKey = (row: ITransaction) =>
    row.id;

  const onPaginationUpdate = () => emit('update');

  function deleteTransaction(
    payload: ITransaction
  ) {
    emit('delete', payload);
  }

  return {
    columns,
    rowKey,
    onPaginationUpdate,
    tableRef
  };
}
